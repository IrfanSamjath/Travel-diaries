# Render Deployment Guide for Travel Diaries

This guide explains how to deploy the full-stack Travel Diaries application on Render.

---

## Backend Deployment

1. **Create a new Web Service** on Render.

2. **Connect your GitHub repository**: https://github.com/IrfanSamjath/Travel-diaries

3. **Configure the service**:
   - **Root Directory**: `backend` (or `travel-diaries-backend` if applicable)
   - **Runtime**: Node.js
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     - `PORT=10000`
     - `MONGODB_URI=your_mongodb_connection_string`
     - `NODE_ENV=production`

4. **Deploy** the service.

---

## Frontend Deployment

1. **Create a new Static Site** on Render.

2. **Connect your GitHub repository**: https://github.com/IrfanSamjath/Travel-diaries

3. **Configure the service**:
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `client/build`

4. **Environment Variables** (optional):
   - `VITE_API_URL=https://your-backend-render-url/api`

5. **Deploy** the service.

---

## Notes

- The frontend axios instance uses the environment variable `VITE_API_URL` to determine the backend API URL. Make sure to set this variable in Render for the frontend static site.

- The backend server listens on the port provided by Render via the `PORT` environment variable.

- Ensure your MongoDB Atlas cluster allows connections from Render's IP addresses or set up appropriate network access.

- After deployment, test the full application flow including creating posts, viewing posts, and image uploads.

---

## Local Development

- Backend: `npm run dev` in the backend directory (uses nodemon)
- Frontend: `npm run dev` in the client directory (uses Vite dev server with proxy)

---

## Troubleshooting

- Check Render logs for build or runtime errors.
- Verify environment variables are correctly set.
- Confirm MongoDB connection string and network access.
- Use Render's shell access to debug if needed.

---

This guide should help you deploy and run the Travel Diaries app smoothly on Render.
