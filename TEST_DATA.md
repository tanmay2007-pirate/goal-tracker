# Sample Test Data

## Test User Accounts (After Registration)

```json
{
  "username": "demo_user",
  "email": "demo@example.com",
  "password": "Demo@123456",
  "playerHealth": 75,
  "totalStars": 42
}
```

## Test Goals JSON

You can import these after login to test the application:

```json
[
  {
    "name": "Read 12 Books This Year",
    "category": "learning",
    "priority": "high",
    "deadline": "2026-06-16",
    "progress": 25
  },
  {
    "name": "Workout 4 Times Per Week",
    "category": "health",
    "priority": "high",
    "deadline": "2026-05-16",
    "progress": 60
  },
  {
    "name": "Complete Course on React",
    "category": "learning",
    "priority": "medium",
    "deadline": "2026-07-16",
    "progress": 40
  },
  {
    "name": "Learn Spanish",
    "category": "personal",
    "priority": "medium",
    "deadline": "2026-12-31",
    "progress": 15
  },
  {
    "name": "Save $5000",
    "category": "finance",
    "priority": "high",
    "deadline": "2026-09-16",
    "progress": 35
  },
  {
    "name": "Get Promoted",
    "category": "career",
    "priority": "high",
    "deadline": "2026-08-16",
    "progress": 50
  },
  {
    "name": "Do 100 Push-ups",
    "category": "health",
    "priority": "low",
    "deadline": "2026-04-16",
    "progress": 75
  },
  {
    "name": "Write a Blog Post",
    "category": "personal",
    "priority": "low",
    "deadline": "2026-03-20",
    "progress": 90
  }
]
```

## API Test Requests

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "Password123"
  }'
```

### Login User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Password123"
  }'
```

### Get Current User
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### Create Goal
```bash
curl -X POST http://localhost:5000/api/goals \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -d '{
    "name": "Learn Piano",
    "category": "personal",
    "priority": "medium",
    "deadline": "2026-12-31"
  }'
```

### Get All Goals
```bash
curl -X GET http://localhost:5000/api/goals \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### Update Goal Progress
```bash
curl -X PUT http://localhost:5000/api/goals/GOAL_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -d '{
    "progress": 50,
    "priority": "high"
  }'
```

### Battle Win
```bash
curl -X POST http://localhost:5000/api/goals/GOAL_ID/battle-win \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### Battle Lose
```bash
curl -X POST http://localhost:5000/api/goals/GOAL_ID/battle-lose \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### Get Stats
```bash
curl -X GET http://localhost:5000/api/goals/stats/summary \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

## MongoDB Import

To import test data directly into MongoDB:

### Create Data File (goals.json)
```json
[
  {
    "_id": {"$oid": "507f1f77bcf86cd799439011"},
    "user": {"$oid": "507f1f77bcf86cd799439010"},
    "name": "Fitness Challenge",
    "description": "Complete fitness goals",
    "category": "health",
    "priority": "high",
    "progress": 50,
    "done": false,
    "deadline": {"$date": "2026-06-16T00:00:00Z"},
    "reminderSent": false,
    "starsEarned": 0,
    "createdAt": {"$date": "2024-03-16T10:00:00Z"}
  }
]
```

### Import Command
```bash
mongoimport --db goalspark --collection goals --file goals.json --jsonArray
```

## Expected Responses

### Successful Login
Status: 200 OK
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439010",
    "username": "testuser",
    "email": "test@example.com",
    "playerHealth": 100,
    "totalStars": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Error Response (Bad Password)
Status: 401 Unauthorized
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

### Error Response (Missing Field)
Status: 400 Bad Request
```json
{
  "success": false,
  "message": "Name and category required"
}
```

## Performance Testing

### Load Test with Artillery
```bash
npm install -g artillery

# Create load-test.yml
# Run: artillery run load-test.yml
```

### Memory Usage Check
```bash
# Monitor Node process
node --max-old-space-size=4096 server.js

# Check performance
node --prof server.js
```

## Testing Checklist

- [ ] User Registration - Create new account
- [ ] User Login - Login with credentials
- [ ] Add Goal - Create goal with all fields
- [ ] Edit Goal - Update goal details
- [ ] Delete Goal - Remove a goal
- [ ] Update Progress - Change progress percentage
- [ ] Battle Win - Complete goal in battle mode
- [ ] Battle Lose - Retreat from goal battle
- [ ] Health Changes - Verify health increases/decreases
- [ ] Filter Goals - Filter by category
- [ ] View Streak - Check activity streak
- [ ] View Chart - Check progress by category
- [ ] Logout - Clear session and token
- [ ] Deadline Reminder - Check deadline notifications

## Notes

- JWT tokens expire after 30 days
- Health automatically caps at 100 max and 0 minimum
- Progress automatically caps at 0-100
- Completed goals are marked as done
- Stars earned based on priority (high=5, medium=3, low=1)
- Streaks reset if no activity for a day
