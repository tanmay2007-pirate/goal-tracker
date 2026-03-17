# GoalSpark - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Setup MongoDB

**Option A: Local MongoDB**
```bash
# Install MongoDB from https://www.mongodb.com/try/download/community
# Run MongoDB service
mongod
```

**Option B: MongoDB Atlas (Cloud - Recommended)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a new cluster
4. Get connection string
5. Copy into `.env`

### Step 3: Create Environment File
Copy `.env.example` to `.env` and update values:
```bash
cp .env.example .env
```

Edit `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/goalspark
JWT_SECRET=change_this_to_random_string
NODE_ENV=development
```

### Step 4: Start the Server
```bash
npm start
```

Server runs at: **http://localhost:5000**

### Step 5: Access the App
1. Open http://localhost:5000 in browser
2. Click "Sign up" to create account
3. Start tracking goals!

---

## 📋 Feature Walkthrough

### Add a Goal
1. Fill in goal name (e.g., "Read 12 books")
2. Select category (Health, Learning, Career, Personal, Finance)
3. Set priority (High/Medium/Low)
4. Pick a deadline (optional)
5. Click "+ Add Goal"

### Battle Mode
1. Click ⚔️ button on any goal
2. **To Win:** Click "COMPLETE TASK"
   - +25% progress
   - +20 health
   - +3-5 stars (based on priority)
3. **To Lose:** Click "Retreat"
   - -10 health
   - Goal unchanged

### Track Health
- Health bar in top header shows your current status
- Win battles to gain health (up to 100%)
- Lose battles to lose health (minimum 0%)

### Monitor Progress
- Slider below each goal updates progress (0-100%)
- Auto-complete at 100%
- Filter by category
- View chart by category

### Check Streak
- Daily activity tracking
- Shows best streak ever
- Last 21 days calendar view

---

## 🎮 Game Mechanics

| Action | Health | Progress | Stars |
|--------|--------|----------|-------|
| Win Battle | +20 | +25% | Based on Priority |
| Lose Battle | -10 | No change | 0 |
| Manual Update | N/A | Manual | 0 |
| Complete Task | N/A | 100% | 0 |

**Star Values by Priority:**
- 🔴 High = 5 ⭐
- 🟡 Medium = 3 ⭐
- 🟢 Low = 1 ⭐

---

## 🛠️ Development

### Development Mode (with auto-reload)
```bash
npm run dev
```

### API Testing
Use Postman or curl to test endpoints:
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"user1","email":"user@example.com","password":"pass123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"pass123"}'
```

---

## 📦 Project Structure

```
GoalSpark/
├── server.js              ← Main server file
├── package.json           ← Dependencies
├── .env                   ← Configuration (create this)
├── models/
│   ├── User.js           ← User database model
│   └── Goal.js           ← Goal database model
├── routes/
│   ├── auth.js           ← Login/Register endpoints
│   └── goals.js          ← Goal CRUD endpoints
├── middleware/
│   └── auth.js           ← JWT authentication
├── config/
│   └── db.js             ← MongoDB connection
└── public/
    ├── index.html        ← Login page
    └── dashboard.html    ← Main app
```

---

## ❓ Troubleshooting

**Error: "Cannot find module 'express'"**
```bash
npm install
```

**Error: "MongooseConnectionError"**
- Check MongoDB is running
- Verify MONGODB_URI in .env is correct

**Port 5000 already in use?**
```bash
# Change PORT in .env to 5001
PORT=5001
```

**Logout not working?**
- Check browser localStorage is not disabled
- Try clearing browser cache

**Battle mode not responding?**
- Check browser console (F12)
- Verify backend is running
- Check internet connection

---

## 🌐 Deploy to Production

### Deploy to Render (Easiest - Free Tier Available)

1. Push code to GitHub
2. Go to https://render.com
3. Connect your GitHub repo
4. Add environment variables
5. Deploy!

### Deploy to Vercel (Frontend Only)
Since this uses a backend, use Render for full-stack.

### Self-hosted (AWS/DigitalOcean)
1. Get a VPS
2. Upload code
3. Install Node.js and MongoDB
4. Set up reverse proxy (nginx)
5. Use PM2 for process management

---

## 📚 Learn More

- **Express.js:** https://expressjs.com/
- **MongoDB:** https://docs.mongodb.com/
- **JWT:** https://jwt.io/
- **Chart.js:** https://www.chartjs.org/

---

## 🎯 Next Steps

After getting comfortable:
- [ ] Customize colors in CSS
- [ ] Add more event types
- [ ] Create admin dashboard
- [ ] Add email notifications
- [ ] Deploy to production
- [ ] Add mobile app with React Native

---

**Happy goal tracking! 🚀**
