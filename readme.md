# Vibbz

Vibbz is a full-stack social media web application built on the MERN stack (MongoDB, Express, React, Node.js). It supports user authentication, posting, likes, comments, following/unfollowing, and notifications, with image uploads handled via Cloudinary.

## Tech Stack

**Backend**
- Node.js + Express
- MongoDB with Mongoose
- JWT-based authentication (stored in an httpOnly cookie)
- bcryptjs for password hashing
- Cloudinary for image storage
- cookie-parser, cors, dotenv

**Frontend**
- React 19 + Vite
- React Router v7
- TanStack Query (React Query) for data fetching/caching
- Tailwind CSS v4 + DaisyUI
- React Hot Toast for notifications
- React Icons

## Features

- **Authentication**: Sign up, log in, log out, and session persistence via JWT stored in a secure, httpOnly cookie.
- **Posts**: Create posts (text and/or image), view all posts, view posts from followed users, view a specific user's posts, delete own posts.
- **Engagement**: Like/unlike posts, comment on posts, view a user's liked posts.
- **Social graph**: Follow/unfollow users, view suggested users to follow.
- **Profiles**: View and update user profile (bio, link, profile image, cover image).
- **Notifications**: Receive notifications for follows and likes, view all notifications, delete notifications.

## Project Structure

Vibbz_Full_Stack_Project/
├── backend/
│   ├── controllers/       # Route handler logic (auth, user, post, notification)
│   ├── db/                # MongoDB connection setup
│   ├── middlewares/       # Route protection (JWT verification)
│   ├── models/            # Mongoose schemas (User, Post, Notification)
│   ├── routes/            # Express route definitions
│   ├── utils/             # Helper utilities (JWT token generation)
│   └── server.js          # App entry point
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable UI components, skeleton loaders, svgs
│   │   ├── hooks/         # Custom React hooks (follow/unfollow, profile update)
│   │   ├── pages/         # Auth, home, notification, and profile pages
│   │   └── utils/         # Date formatting and other helpers
│   └── vite.config.js
├── sample.env             # Environment variable template
└── package.json           # Root scripts (dev/build/start) and backend dependencies


All routes except signup/login are protected by JWT middleware that verifies the `jwt` cookie and attaches the authenticated user to the request.

## Getting Started

### Prerequisites
- Node.js
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

### Setup

1. Clone the repository
```bash
   git clone https://github.com/hrq278/Vibbz_Full_Stack_Project.git
   cd Vibbz_Full_Stack_Project
```

2. Install backend dependencies (from root)
```bash
   npm install
```

3. Install frontend dependencies
```bash
   npm install --prefix frontend
```

4. Configure environment variables — copy `sample.env` to `.env` in the root and fill in:
MONGODB_URI=
PORT=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
JWT_SECRET=
JWT_SECRET_EXPIRY=
NODE_ENV=

5. Run in development mode
```bash
   npm run dev
```
   This starts the backend with nodemon. Run the frontend separately with:
```bash
   npm run dev --prefix frontend
```

6. Build for production
```bash
   npm run build
   npm start
```
   In production, Express serves the built frontend from `frontend/dist`.

## License

ISC
