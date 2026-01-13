## Project Overview

This is the frontend of a MERN Movie Application built with React and Vite. It provides a user-friendly interface for browsing movies, managing watchlists, and administrative features for authorized users. The application implements JWT-based authentication with role-based access control.

## Tech Stack

- **React 18** with Vite
- **Tailwind CSS** + **shadcn/ui** for styling
- **Context API** for state management
- **TanStack Query (React Query)** for server state management
- **React Router v6** for routing and protected routes
- **JWT Authentication** with httpOnly cookies
- **Axios** for API requests

## Folder Structure

```
src/
├── components/       # Reusable UI components
├── pages/           # Page components
├── context/         # Context API providers
├── hooks/           # Custom hooks
├── services/        # API service calls
├── utils/           # Utility functions
├── layouts/         # Layout components
├── api/             # API integration logic
├── queries/         # TanStack Query hooks
└── App.jsx          # Main app component
```

## Environment Variables

Create a `.env.local` file in the root directory:

```
VITE_API_URL=http://localhost:3000/api
```

## Installation & Running the App

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Authentication & Authorization Flow

- Users log in with credentials; JWT token is stored in an httpOnly cookie
- Token is automatically sent with each API request
- Context API maintains user state and role information
- Unauthorized requests are intercepted and users are redirected to login
- Role-based access control determines available features

## Routing & Protected Routes

Protected routes verify user authentication before rendering. Admin routes require `admin` role. Unauthenticated users are redirected to `/login`.

```jsx
<ProtectedRoute>
  <AdminDashboard />
</ProtectedRoute>
```

## Admin Features

- Movie management (create, read, update, delete)
- User management and role assignment
- Analytics and statistics dashboard
- Admin-only navigation and UI elements

## API Integration Notes

- Base URL: `http://localhost:3000/api`
- All requests include JWT token via httpOnly cookies
- TanStack Query handles caching and synchronization
- Error handling with user-friendly messages

## Common Issues & Notes

- Ensure backend runs on `http://localhost:3000`
- Clear browser cookies if authentication persists after logout
- Check network tab in DevTools if API calls fail
- CORS must be configured on backend for localhost:5173

## Production Build Instructions

```bash
npm run build
# Output is in dist/ directory
# Deploy dist/ folder to hosting service
```

Ensure `VITE_API_URL` points to production API endpoint in `.env.production.local`.
