# Travel Diaries Backend

A Node.js/Express backend API for the Travel Diaries application.

## Features

- RESTful API for blog posts
- Image upload support
- MongoDB integration
- CORS enabled for frontend communication

## API Endpoints

- `GET /api/posts` - Get all blog posts
- `GET /api/posts/:id` - Get a single blog post
- `POST /api/posts` - Create a new blog post (with optional image upload)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/traveldiaries
```

3. Make sure MongoDB is running locally

4. Start the server:
```bash
npm run dev
```

## Environment Variables

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string

## File Structure

```
backend/
├── models/
│   └── Post.js
├── middleware/
│   └── upload.js
├── routes/
│   └── posts.js
├── uploads/ (created automatically)
├── .env
├── .gitignore
├── package.json
└── server.js
