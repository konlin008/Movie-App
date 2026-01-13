# MERN Movie App

A full-stack movie application built with the MERN stack, featuring user authentication, role-based access control, and dynamic movie management.

## Overview

This is a comprehensive full-stack web application that allows users to explore movies, manage watchlists, and leave reviews. Administrators can manage movie content, user accounts, and application settings. The application implements secure JWT-based authentication with httpOnly cookies and role-based authorization.

## Features

### User Features

- Browse and search movies with advanced filtering
- User authentication and profile management
- Add movies to personal watchlist
- Leave ratings and reviews on movies
- View personalized recommendations
- Responsive UI across all devices

### Admin Features

- Full movie CRUD operations
- User management and role assignment
- Review moderation
- Application analytics and monitoring
- Content approval workflows

## Tech Stack

### Frontend

- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: Context API + TanStack Query (React Query)
- **Routing**: react-router-dom with protected routes
- **Deployment**: Vercel

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with httpOnly cookies
- **Security**: CORS, helmet, secure headers
- **Deployment**: Render

## Authentication & Authorization

- **JWT-based authentication** stored securely in httpOnly cookies
- **Role-based access control** (RBAC) with User and Admin roles
- **Protected routes** on both frontend and backend
- **Automatic token refresh** using React Query interceptors
- **HTTPS-enforced** communication in production

## Project Structure

```
MERN-Movie-App/
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── hooks/
│   │   └── App.jsx
│   └── README.md
├── server/                 # Backend (Node + Express)
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   └── README.md
└── README.md
```

## Local Development Setup

### Prerequisites

- Node.js (v16+)
- MongoDB (local or Atlas connection)
- npm or yarn

### Backend Setup

1. Navigate to the server directory
2. Install dependencies: `npm install`
3. Configure environment variables (see below)
4. Start development server: `npm run dev`

### Frontend Setup

1. Navigate to the client directory
2. Install dependencies: `npm install`
3. Configure environment variables (see below)
4. Start dev server: `npm run dev`

## Environment Variables

### Frontend (.env.local)

```
VITE_API_BASE_URL=http://localhost:5000
VITE_APP_NAME=MERN Movie App
```

### Backend (.env)

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

## Deployment

- **Frontend**: Deployed on Vercel (automatic deployments from main branch)
- **Backend**: Deployed on Render with health check endpoint for uptime monitoring
- **Database**: MongoDB Atlas (production)

## Live Demo

- **Frontend URL**: [Link to deployed frontend]
- **Backend API**: [Link to deployed backend]

## Additional Documentation

- [Frontend README](./client/README.md)
- [Backend README](./server/README.md)

## Getting Help

Refer to individual README files in `client/` and `server/` directories for detailed documentation.

---

_Built as a full-stack MERN application project_
