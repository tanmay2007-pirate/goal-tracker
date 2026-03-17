// routes/goals.js
const express = require('express');
const Goal = require('../models/Goal');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all goals for user
router.get('/', auth, async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: goals });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create goal
router.post('/', auth, async (req, res) => {
  try {
    const { name, description, category, priority, deadline } = req.body;

    if (!name || !category) {
      return res.status(400).json({ success: false, message: 'Name and category required' });
    }

    const goal = await Goal.create({
      user: req.userId,
      name,
      description,
      category,
      priority: priority || 'low',
      deadline: deadline ? new Date(deadline) : null
    });

    res.status(201).json({ success: true, data: goal });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update goal
router.put('/:id', auth, async (req, res) => {
  try {
    const { name, description, category, priority, progress, deadline, done } = req.body;

    let goal = await Goal.findById(req.params.id);
    if (!goal) {
      return res.status(404).json({ success: false, message: 'Goal not found' });
    }

    if (goal.user.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    if (name) goal.name = name;
    if (description) goal.description = description;
    if (category) goal.category = category;
    if (priority) goal.priority = priority;
    if (progress !== undefined) goal.progress = progress;
    if (deadline) goal.deadline = new Date(deadline);
    if (done !== undefined) {
      goal.done = done;
      if (done) goal.completedAt = new Date();
    }
    goal.updatedAt = new Date();

    goal = await goal.save();
    res.status(200).json({ success: true, data: goal });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete goal
router.delete('/:id', auth, async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
      return res.status(404).json({ success: false, message: 'Goal not found' });
    }

    if (goal.user.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    await goal.deleteOne();
    res.status(200).json({ success: true, message: 'Goal deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Battle mode - complete goal
router.post('/:id/battle-win', auth, async (req, res) => {
  try {
    let goal = await Goal.findById(req.params.id);
    if (!goal) {
      return res.status(404).json({ success: false, message: 'Goal not found' });
    }

    if (goal.user.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const priorityStars = { high: 5, medium: 3, low: 1 }[goal.priority || 'low'];
    goal.progress = Math.min(100, goal.progress + 25);
    goal.starsEarned += priorityStars;
    if (goal.progress === 100) {
      goal.done = true;
      goal.completedAt = new Date();
    }

    const user = await User.findById(req.userId);
    user.playerHealth = Math.min(100, user.playerHealth + 20);
    user.totalStars += priorityStars;
    
    await user.save();
    goal = await goal.save();

    res.status(200).json({
      success: true,
      data: { goal, playerHealth: user.playerHealth, totalStars: user.totalStars, starsEarned: priorityStars }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Battle mode - lose
router.post('/:id/battle-lose', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    user.playerHealth = Math.max(0, user.playerHealth - 10);
    await user.save();

    res.status(200).json({
      success: true,
      data: { playerHealth: user.playerHealth }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get stats
router.get('/stats/summary', auth, async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.userId });
    const user = await User.findById(req.userId);

    const total = goals.length;
    const completed = goals.filter(g => g.done).length;
    const avgProgress = total ? Math.round(goals.reduce((a, g) => a + g.progress, 0) / total) : 0;

    res.status(200).json({
      success: true,
      data: {
        totalGoals: total,
        completedGoals: completed,
        avgProgress,
        playerHealth: user.playerHealth,
        totalStars: user.totalStars,
        streak: user.streak
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
