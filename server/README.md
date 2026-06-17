# Hackfolic Server - Node.js with PostgreSQL

A Node.js backend API for the Hackathon Management System built with Express and PostgreSQL.

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm

## Installation

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Setup PostgreSQL Database

#### Option A: Using PostgreSQL (Windows)

1. **Install PostgreSQL** from [postgresql.org](https://www.postgresql.org/download/windows/)

2. **Create Database**
   ```sql
   CREATE DATABASE hackfolic_db;
   ```

3. **Configure .env file**
   - Update the `.env` file in the server directory
   - Set your PostgreSQL credentials:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=hackfolic_db
   DB_USER=postgres
   DB_PASSWORD=your_password
   JWT_SECRET=your_jwt_secret_key_here
   PORT=8000
   NODE_ENV=development
   ```

### 3. Run Database Migrations

The application automatically syncs the database schema on startup.

### 4. (Optional) Seed Sample Data

```bash
node scripts/seed.js
```

### 5. Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:8000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (requires token)

### Hackathons
- `GET /api/hackathons` - Get all hackathons
- `GET /api/hackathons/:id` - Get hackathon by ID
- `GET /api/hackathons/search?query=...&category=...` - Search hackathons
- `POST /api/hackathons` - Create hackathon (Host only)
- `PUT /api/hackathons/:id` - Update hackathon (Host only)
- `DELETE /api/hackathons/:id` - Delete hackathon (Host only)

### Participation
- `POST /api/participation/register` - Register for hackathon
- `GET /api/participation/user/registrations` - Get user's registrations
- `GET /api/participation/:hackathonId/participants` - Get hackathon participants
- `DELETE /api/participation/:hackathonId/withdraw` - Withdraw from hackathon

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/profile` - Update user profile (requires token)
- `GET /api/users/host/:hostId` - Get host profile

## Database Schema

### Users Table
- id (UUID, Primary Key)
- firstName (String)
- lastName (String)
- email (String, Unique)
- password (String, Hashed)
- phoneNumber (String)
- profileImage (String)
- role (Enum: admin, host, participant)
- createdAt (DateTime)
- updatedAt (DateTime)

### Hackathons Table
- id (UUID, Primary Key)
- title (String)
- description (Text)
- startDate (DateTime)
- endDate (DateTime)
- location (String)
- category (String)
- prizePool (Decimal)
- maxParticipants (Integer)
- image (String)
- hostId (UUID, Foreign Key)
- status (Enum: upcoming, ongoing, completed, cancelled)
- createdAt (DateTime)
- updatedAt (DateTime)

### Participations Table
- id (UUID, Primary Key)
- userId (UUID, Foreign Key)
- hackathonId (UUID, Foreign Key)
- teamName (String)
- status (Enum: registered, confirmed, withdrew)
- registeredAt (DateTime)
- createdAt (DateTime)
- updatedAt (DateTime)

## Authentication

The API uses JWT (JSON Web Tokens) for authentication.

1. **Register/Login** to get a token
2. **Include token** in request headers: `Authorization: Bearer <token>`

Example:
```bash
curl -H "Authorization: Bearer your_token_here" http://localhost:8000/api/auth/profile
```

## Technology Stack

- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Authentication**: JWT + bcryptjs
- **Validation**: express-validator

## Environment Variables

```env
DB_HOST=localhost           # PostgreSQL host
DB_PORT=5432               # PostgreSQL port
DB_NAME=hackfolic_db       # Database name
DB_USER=postgres           # Database user
DB_PASSWORD=your_password  # Database password
JWT_SECRET=secret_key      # JWT signing secret
PORT=8000                  # Server port
NODE_ENV=development       # Environment
```

## Troubleshooting

### PostgreSQL Connection Error
- Ensure PostgreSQL is running
- Check credentials in `.env` file
- Verify database exists: `CREATE DATABASE hackfolic_db;`

### Port Already in Use
- Change PORT in `.env` file
- Or kill process on port 8000

### Database Sync Error
- Ensure tables don't already exist or use fresh database
- Check PostgreSQL permissions

## Development Notes

- Passwords are automatically hashed with bcryptjs before saving
- All dates are stored in UTC
- UUIDs are auto-generated for primary keys
- Relationships are defined with Sequelize associations

## Support

For issues or questions, please check the logs and ensure all dependencies are properly installed.
