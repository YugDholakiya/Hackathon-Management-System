# Hackfolic Hackathon Management System - Complete Setup Guide

## Project Overview

This is a full-stack Hackathon Management System with:
- **Frontend**: React with Vite
- **Backend**: Node.js with Express.js
- **Database**: PostgreSQL

## Directory Structure

```
Hackfolic-Hackathon-Management-System-main/
├── client/                 # React frontend
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   ├── .env
│   └── ...
├── server/                 # Node.js backend
│   ├── config/            # Database configuration
│   ├── models/            # Sequelize models
│   ├── controllers/       # Route controllers
│   ├── routes/            # API routes
│   ├── middleware/        # Authentication middleware
│   ├── scripts/           # Database seeds
│   ├── index.js           # Main server file
│   ├── package.json
│   ├── .env
│   ├── README.md
│   └── ...
└── README.md
```

## Complete Setup Instructions

### Prerequisites

1. **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
2. **PostgreSQL** (v12 or higher) - [Download](https://www.postgresql.org/download/)
3. **npm** (comes with Node.js)
4. **Git** (optional)

### Step 1: Setup PostgreSQL Database

#### Windows Installation:
1. Download PostgreSQL from https://www.postgresql.org/download/windows/
2. Run the installer and follow the setup wizard
3. Remember the password you set for the `postgres` user
4. Choose port 5432 (default)

#### Create Database:
1. Open **pgAdmin** (comes with PostgreSQL) or use **psql** command line
2. Create a new database:
   ```sql
   CREATE DATABASE hackfolic_db;
   ```

### Step 2: Setup Backend (Node.js/Express)

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Update .env file** with your database credentials:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=hackfolic_db
   DB_USER=postgres
   DB_PASSWORD=your_postgres_password
   JWT_SECRET=your_jwt_secret_key_here_make_it_complex
   PORT=8000
   NODE_ENV=development
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the server:**
   - Development mode (with auto-reload):
     ```bash
     npm run dev
     ```
   - Production mode:
     ```bash
     npm start
     ```

   Expected output:
   ```
   ✓ Database connection established
   ✓ Database models synced
   ✓ Server running on port 8000
   ✓ API available at http://localhost:8000/api
   ```

5. **Test the server:**
   - Open browser and go to: http://localhost:8000/api/health
   - Should see: `{"message":"Server is running"}`

### Step 3: Seed Sample Data (Optional)

To populate the database with sample data:

```bash
cd server
node scripts/seed.js
```

This will create:
- 5 sample users (3 hosts, 2 participants)
- 3 sample hackathons
- Sample registrations

### Step 4: Setup Frontend (React)

1. **Navigate to client directory:**
   ```bash
   cd client
   ```

2. **Environment is already configured** (`.env` file already created):
   ```env
   VITE_API_URL=http://localhost:8000/api
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

   Expected output:
   ```
   ✓ built in 1.23s
   
     VITE v5.1.4  ready in 234 ms
   
     ➜  Local:   http://localhost:5173/
   ```

5. **Open in browser:**
   - Navigate to http://localhost:5173/

## API Endpoints Reference

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/profile` | Get user profile (auth required) |

### Hackathons
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/hackathons` | Get all hackathons |
| GET | `/api/hackathons/:id` | Get hackathon by ID |
| GET | `/api/hackathons/search?query=...` | Search hackathons |
| POST | `/api/hackathons` | Create hackathon (host only) |
| PUT | `/api/hackathons/:id` | Update hackathon (host only) |
| DELETE | `/api/hackathons/:id` | Delete hackathon (host only) |

### Participation
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/participation/register` | Register for hackathon |
| GET | `/api/participation/user/registrations` | Get user registrations |
| GET | `/api/participation/:hackathonId/participants` | Get hackathon participants |
| DELETE | `/api/participation/:hackathonId/withdraw` | Withdraw from hackathon |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get user by ID |
| PUT | `/api/users/profile` | Update user profile |
| GET | `/api/users/host/:hostId` | Get host profile |

## Testing the API

### Using Postman/Insomnia:

1. **Register User:**
   ```
   POST http://localhost:8000/api/auth/register
   
   Body:
   {
     "firstName": "John",
     "email": "john@example.com",
     "password": "password123",
     "role": "participant"
   }
   ```

2. **Login:**
   ```
   POST http://localhost:8000/api/auth/login
   
   Body:
   {
     "email": "john@example.com",
     "password": "password123"
   }
   ```

3. **Get Hackathons:**
   ```
   GET http://localhost:8000/api/hackathons
   ```

4. **Register for Hackathon:**
   ```
   POST http://localhost:8000/api/participation/register
   Headers: Authorization: Bearer <token>
   
   Body:
   {
     "hackathonId": "uuid",
     "teamName": "Team Name"
   }
   ```

## Troubleshooting

### Issue: PostgreSQL Connection Error
**Solution:**
- Ensure PostgreSQL service is running
- Check database credentials in `.env`
- Verify database exists: `CREATE DATABASE hackfolic_db;`

### Issue: Port 8000 Already in Use
**Solution:**
- Change PORT in server `.env`
- Or kill process on port 8000

### Issue: Dependencies Installation Failed
**Solution:**
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and package-lock.json
- Run `npm install` again

### Issue: CORS Errors
**Solution:**
- Ensure VITE_API_URL in client `.env` matches server URL
- Verify server is running on correct port

### Issue: Authentication Not Working
**Solution:**
- Check JWT_SECRET is set in server `.env`
- Verify token is being stored in localStorage
- Check browser DevTools Network tab for token in request headers

## Important Notes

- **Passwords** are automatically hashed using bcryptjs
- **Authentication** uses JWT tokens (valid for 7 days)
- **CORS** is enabled for localhost:5173 (frontend)
- **Database** automatically syncs on server start
- **Token** is stored in localStorage after login

## Development Tips

1. **Hot Reload:**
   - Frontend: Automatic with Vite
   - Backend: Use `npm run dev` with nodemon

2. **Database Debugging:**
   - Use pgAdmin to view/edit database
   - Check logs in server console

3. **API Testing:**
   - Use Postman, Insomnia, or curl
   - Include JWT token in Authorization header

4. **Code Organization:**
   - Models in `server/models/`
   - Controllers in `server/controllers/`
   - Routes in `server/routes/`
   - Middleware in `server/middleware/`

## Next Steps

1. Configure frontend components to use API endpoints
2. Add form validations
3. Implement error handling
4. Add loading states
5. Test all features
6. Deploy to production

## Support

For detailed information about specific components:
- Server README: `server/README.md`
- Frontend config: `client/.env`
- Database config: `server/.env`

---

**Happy Hacking! 🚀**
