# GoalSpark - Full Stack Goal Tracking Application

A gamified goal tracking platform with battle mode, health system, priority levels, and progress reminders. This is a complete full-stack web application with frontend, backend API, and MongoDB database.

## Features

✨ **Core Features:**
- 📋 **Goal Management** - Create, edit, delete goals with categories & deadlines
- 🎯 **Priority Levels** - Set High, Medium, or Low priority for each goal
- ⚔️ **Battle Mode** - Gamified interface where goals become epic quests
- ❤️ **Health System** - Player health increases on battle wins, decreases on losses
- ⭐ **Star Rewards** - Earn stars based on priority (High=5⭐, Medium=3⭐, Low=1⭐)
- 🔥 **Streak Tracking** - Build daily activity streaks
- ⏰ **Smart Reminders** - Get notified about overdue and upcoming deadlines
- 📊 **Progress Analytics** - Visual charts showing goal completion by category
- 👤 **User Accounts** - Secure registration and login with JWT authentication

## Tech Stack

**Frontend:**
- HTML5, CSS3, Vanilla JavaScript
- Chart.js for analytics
- Responsive design

**Backend:**
- Node.js + Express.js
- MongoDB with Mongoose
- JWT for authentication
- BCrypt for password hashing

**Deployment:**
- Can be deployed on Heroku, AWS, DigitalOcean, Render, etc.

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud - MongoDB Atlas)
- npm or yarn

### 1. Clone/Extract the Project
```bash
cd sample_goal_tracking_system
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/goalspark
JWT_SECRET=your_super_secret_jwt_key_change_this
NODE_ENV=development
```

For MongoDB Atlas (Cloud):
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/goalspark?retryWrites=true&w=majority
```

### 4. Start MongoDB
If using local MongoDB:
```bash
mongod
```

### 5. Start the Server
```bash
npm start
# or for development with hot reload:
npm run dev
```

Server will run on `http://localhost:5000`

## Usage

1. **Access the Application**
   - Open browser to `http://localhost:5000`
   - Create an account or login

2. **Add Goals**
   - Fill in goal name, category, priority, and deadline
   - Click "Add Goal" button

3. **Track Progress**
   - Use the slider to update progress (0-100%)
   - Goals auto-complete at 100%

4. **Battle Mode**
   - Click the ⚔️ button on any goal
   - Choose to complete the task (Win) or retreat (Lose)
   - Win = +25% progress + 20 HP + stars
   - Lose = -10 HP

5. **Monitor Health**
   - Check health bar in header and sidebar
   - Health increases by battling goals successfully
   - Health decreases when you retreat from battles

6. **View Analytics**
   - See progress chart by category
   - Check activity streak on the sidebar
   - View total stats at the top

## File Structure

```
sample_goal_tracking_system/
├── public/
│   ├── index.html              # Login/signup page
│   └── dashboard.html          # Main application
├── models/
│   ├── User.js                 # User schema
│   └── Goal.js                 # Goal schema
├── routes/
│   ├── auth.js                 # Authentication endpoints
│   └── goals.js                # Goal management endpoints
├── middleware/
│   └── auth.js                 # JWT authentication middleware
├── config/
│   └── db.js                   # MongoDB connection
├── server.js                   # Express server
├── package.json                # Dependencies
├── .env.example                # Environment variables template
└── README.md                   # This file
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile

### Goals
- `GET /api/goals` - Get all goals
- `POST /api/goals` - Create new goal
- `PUT /api/goals/:id` - Update goal
- `DELETE /api/goals/:id` - Delete goal
- `POST /api/goals/:id/battle-win` - Win a battle
- `POST /api/goals/:id/battle-lose` - Lose a battle
- `GET /api/goals/stats/summary` - Get user statistics

## Deployment Guide

### Deploy to Render (Recommended - Free)

1. Push your code to GitHub
2. Go to https://render.com
3. Create new Web Service
4. Connect your GitHub repository
5. Set environment variables in Render dashboard
6. Deploy!

### Deploy to Heroku

1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create app-name`
4. Set env vars: `heroku config:set MONGODB_URI=your_mongodb_url`
5. Push: `git push heroku main`

### Deploy to DigitalOcean App Platform

1. Push to GitHub
2. Connect repository on DigitalOcean
3. Set environment variables
4. Deploy!

## Frontend Customization

The frontend uses vanilla JavaScript without a build tool. To customize:

1. **Colors** - Edit CSS variables in `public/dashboard.html` and `public/index.html`:
   ```css
   :root {
     --orange: #F06A2B;
     --cream: #FDFAF4;
     /* etc... */
   }
   ```

2. **Add New Categories** - Edit the `<select>` elements and `CAT_COLORS` object

3. **Modify Battle System** - Edit battle functions in the JavaScript section

## Database

### User Schema
```javascript
{
  username: String,
  email: String,
  password: String (hashed),
  playerHealth: Number (0-100),
  totalStars: Number,
  streak: {
    current: Number,
    best: Number,
    days: [String]
  }
}
```

### Goal Schema
```javascript
{
  user: ObjectId (reference to User),
  name: String,
  description: String,
  category: String (health|learning|career|personal|finance),
  priority: String (low|medium|high),
  progress: Number (0-100),
  done: Boolean,
  deadline: Date,
  starsEarned: Number
}
```

## Troubleshooting

### "Cannot find module" errors
```bash
npm install
```

### MongoDB connection error
- Check MongoDB is running
- Verify connection string in .env
- Check firewall/port access

### Port already in use
```bash
# Change PORT in .env to 5001 or another available port
```

### CORS errors
- Server should allow localhost during development
- Update CORS settings in server.js for production domain

## Future Enhancements

- [ ] Mobile app (React Native)
- [ ] Social features (share goals, leaderboards)
- [ ] Advanced analytics (burndown charts, trend analysis)
- [ ] Goal templates and suggestions
- [ ] Email notifications
- [ ] Dark mode
- [ ] Goal categories with custom colors
- [ ] Collaborative goals
- [ ] Achievement badges and system

## Security Notes

- Always change JWT_SECRET in production
- Use strong passwords
- Enable HTTPS in production
- Keep dependencies updated
- Use environment variables for sensitive data
- Validate all user inputs

## Support & Contributing

For bugs, feature requests, or contributions, please create an issue or submit a pull request.

## License

MIT License - Feel free to use this project for personal or commercial use.

---

**Built with ❤️ for goal achievers everywhere!**
