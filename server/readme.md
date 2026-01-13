# MERN Movie App - Backend Server

## Overview

This is the Node.js + Express backend for the MERN Movie Application. It provides RESTful APIs for user authentication, movie management, and role-based access control using JWT tokens stored in httpOnly cookies.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Cookie Security**: httpOnly cookies

## Setup Instructions

### Prerequisites

- Node.js (v14+)
- MongoDB running locally or MongoDB Atlas connection string
- npm or yarn

### Installation
    
1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the server root directory:

   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/mern-movie-app
   JWT_SECRET=your_super_secret_jwt_key_here
   CLIENT_URL=http://localhost:5173
   ```

4. Start the server:
   ```bash
   npm start
   ```
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

## Environment Variables

| Variable      | Description                | Example                             |
| ------------- | -------------------------- | ----------------------------------- |
| `PORT`        | Server port                | `3000`                              |
| `MONGODB_URI` | MongoDB connection string  | `mongodb://localhost:27017/db-name` |
| `JWT_SECRET`  | Secret key for JWT signing | `your_secret_key`                   |
| `CLIENT_URL`  | Frontend URL for CORS      | `http://localhost:5173`             |

## API Endpoints

### Authentication Routes (`/api/v1/auth`)

| Method | Endpoint    | Description              | Auth Required |
| ------ | ----------- | ------------------------ | ------------- |
| POST   | `/register` | Register new user        | No            |
| POST   | `/login`    | Login user               | No            |
| POST   | `/logout`   | Logout user              | Yes           |
| GET    | `/profile`  | Get current user profile | Yes           |

### Movie Routes (`/api/v1/movies`)

| Method | Endpoint | Description       | Auth Required | Role Required |
| ------ | -------- | ----------------- | ------------- | ------------- |
| GET    | `/`      | List all movies   | No            | -             |
| GET    | `/:id`   | Get movie details | No            | -             |
| POST   | `/`      | Create new movie  | Yes           | Admin         |
| PUT    | `/:id`   | Update movie      | Yes           | Admin         |
| DELETE | `/:id`   | Delete movie      | Yes           | Admin         |

## Authentication & Role-Based Access Control

### Flow

1. **Registration/Login**: User credentials are validated; JWT token is generated and stored in an httpOnly cookie
2. **Protected Routes**: Each request includes the JWT in the cookie
3. **Middleware Verification**: `authMiddleware` validates the token and extracts user data
4. **Role Check**: `adminMiddleware` ensures only admin users can access admin routes

### Cookie Security

- JWT tokens are stored in **httpOnly cookies** (not accessible via JavaScript)
- Cookies are automatically sent with each request (same-origin only)
- CSRF protection should be implemented in production

## Running the Server

### Development

```bash
npm run dev
```

Runs on `http://localhost:3000` with auto-reload on file changes.

### Production

```bash
npm start
```


## Project Structure

```
server/
├── routes/          # API route handlers
├── controllers/     # Business logic
├── middleware/      # Auth & role-based middleware
├── models/          # Mongoose schemas
├── config/          # Database & environment config
├── server.js        # Entry point
└── package.json
```

## Development Notes

- **CORS**: Configured to accept requests from `http://localhost:5173`
- **Cookies**: Credentials are included in cross-origin requests
- **Error Handling**: Centralized error handling middleware for consistent responses
- **Validation**: Request validation at route/controller level

## Production Checklist

- Update `CLIENT_URL` to production frontend domain
- Use strong `JWT_SECRET` (min 32 characters)
- Enable HTTPS for cookie transmission
- Use MongoDB Atlas or managed database service
