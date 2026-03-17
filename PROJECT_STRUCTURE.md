# GoalSpark Full-Stack Application Structure

```
c:/vs code files/sample_goal_tracking_system/
│
├── 📄 server.js                    ← Main Express server
├── 📄 package.json                 ← NPM dependencies & scripts
├── 📄 .env.example                 ← Environment variables template
├── 📄 .gitignore                   ← Git ignore rules
├── 📄 README.md                    ← Complete documentation
├── 📄 QUICKSTART.md                ← Quick start guide
├── 📄 goal-tracker.html            ← Standalone version (local storage)
├── 📄 GoalPulse_Tracker.html       ← Alternative design
│
├── 📁 config/
│   └── db.js                       ← MongoDB connection setup
│
├── 📁 middleware/
│   └── auth.js                     ← JWT authentication middleware
│
├── 📁 models/
│   ├── User.js                     ← User schema (registration, health, stats)
│   └── Goal.js                     ← Goal schema (tasks, priority, progress)
│
├── 📁 routes/
│   ├── auth.js                     ← Authentication endpoints
│   │   ├── POST /api/auth/register
│   │   ├── POST /api/auth/login
│   │   └── GET /api/auth/me
│   │
│   └── goals.js                    ← Goal management endpoints
│       ├── GET /api/goals           (fetch all)
│       ├── POST /api/goals          (create)
│       ├── PUT /api/goals/:id       (update)
│       ├── DELETE /api/goals/:id    (delete)
│       ├── POST /api/goals/:id/battle-win    (victory)
│       ├── POST /api/goals/:id/battle-lose   (defeat)
│       └── GET /api/goals/stats/summary      (analytics)
│
└── 📁 public/
    ├── index.html                  ← Login/Register page
    │   ├── Login form
    │   ├── Registration form
    │   ├── JWT token management
    │   └── Hero section with features
    │
    └── dashboard.html              ← Main application
        ├── Header with health bar
        ├── Statistics cards
        ├── Add goal form (with priority)
        ├── Goal list with:
        │   ├── Priority badges
        │   ├── Deadline tracking
        │   ├── Progress sliders
        │   └── Battle mode buttons
        ├── Filter by category
        ├── Edit goal modal
        ├── Battle mode modal
        ├── Sidebar with:
        │   ├── Health display
        │   ├── Streak calendar
        │   ├── Progress chart
        │   └── Tips section
        └── API integration (fetch/axios)

```

## 🎯 Key Features Implemented

### 1. Priority System
- **High (🔴)** - 5 ⭐ reward, urgent tasks
- **Medium (🟡)** - 3 ⭐ reward, important tasks
- **Low (🟢)** - 1 ⭐ reward, casual tasks

### 2. Health Bar System
- **Max:** 100 HP
- **Win Battle:** +20 HP
- **Lose Battle:** -10 HP
- **Critical:** At 0 HP, cannot play

### 3. Battle Mode
- Random or selected goal
- **Complete Task:** +25% progress, +stars, +20 HP
- **Retreat:** -10 HP, no progress change

### 4. Deadline Reminders
- Overdue detection (⚠️ warning)
- Due soon (⏰ 1-3 days left)
- On track (📅 4+ days left)
- Auto-reminder notifications

### 5. User Management
- Secure registration with bcrypt
- JWT authentication
- User profile with stats
- Health and star tracking

### 6. Analytics
- Goal completion by category (chart)
- Activity streak tracking
- Total stats (goals, completed, stars)
- Daily activity calendar

## 🔌 API Response Examples

**Login Response:**
```json
{
  "success": true,
  "token": "eyJhbGc...",
  "data": {
    "id": "507f1f77...",
    "username": "john_doe",
    "email": "john@example.com",
    "playerHealth": 100,
    "totalStars": 15
  }
}
```

**Create Goal Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77...",
    "user": "507f1f77...",
    "name": "Read 12 books",
    "category": "learning",
    "priority": "high",
    "progress": 0,
    "done": false,
    "deadline": "2026-06-16",
    "starsEarned": 0
  }
}
```

**Battle Win Response:**
```json
{
  "success": true,
  "data": {
    "goal": { ...updated goal },
    "playerHealth": 120,
    "totalStars": 20,
    "starsEarned": 5
  }
}
```

## 🚀 Quick Commands

```bash
# Install dependencies
npm install

# Start development server
npm start

# Development mode with auto-reload
npm run dev

# Connect to MongoDB locally
mongod

# Test health endpoint
curl http://localhost:5000/api/health
```

## 📊 Database Collections

**Users Collection:**
- username, email, password (hashed), playerHealth, totalStars, streak

**Goals Collection:**
- user (ref), name, category, priority, progress, done, deadline, starsEarned, createdAt

## 🎨 Frontend Pages

1. **index.html** - Landing page with login/signup
2. **dashboard.html** - Main application after login
   - Real-time sync with backend
   - JWT protected API calls
   - Responsive design

## ✅ Ready to Deploy!

All files are production-ready. Just need to:
1. ✅ Backend API (Express)
2. ✅ Database (MongoDB)
3. ✅ Frontend (HTML/CSS/JS)
4. ✅ Authentication (JWT)
5. ✅ Documentation (README)

Deploy to Render, Heroku, AWS, or DigitalOcean!

