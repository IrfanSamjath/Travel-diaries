# Travel Diaries

A full-stack web application for sharing and discovering travel experiences. Users can create, read, and share travel blog posts with images.

## 🚀 Features

- **Full-Stack Architecture**: React frontend with Node.js/Express backend
- **Blog Management**: Create, read, and display travel blog posts
- **Image Upload**: Support for uploading images with blog posts
- **Responsive Design**: Mobile-friendly interface
- **RESTful API**: Well-structured backend API
- **MongoDB Integration**: NoSQL database for data persistence

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS** - Custom styling

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Multer** - File upload middleware
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
travel-diaries/
├── backend/                 # Backend API server
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── uploads/            # Uploaded images
│   ├── server.js           # Main server file
│   └── package.json
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── api/            # API integration
│   │   └── App.jsx         # Main app component
│   ├── index.html          # HTML template
│   └── package.json
├── .env                    # Environment variables
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/IrfanSamjath/Travel-diaries.git
   cd travel-diaries
   ```

2. **Set up the Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Set up the Frontend**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Configuration**

   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/traveldiaries
   ```

5. **Start MongoDB**
   Make sure MongoDB is running on your local machine.

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

2. **Start the Frontend**
   ```bash
   cd client
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

3. **Access the Application**
   Open your browser and navigate to `http://localhost:5173`

## 📡 API Endpoints

### Blog Posts
- `GET /api/posts` - Get all blog posts
- `GET /api/posts/:id` - Get a single blog post by ID
- `POST /api/posts` - Create a new blog post (supports image upload)

### Request/Response Examples

**Create a Blog Post:**
```bash
curl -X POST http://localhost:5000/api/posts \
  -F "title=My Travel Story" \
  -F "content=Amazing journey..." \
  -F "image=@path/to/image.jpg"
```

## 🔧 Development

### Available Scripts

**Backend:**
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Environment Variables

**Backend (.env):**
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string

## 📱 Features Overview

### Frontend Features
- **Home Page**: Welcome page with navigation
- **Blog Page**: Display all travel posts
- **Post Details**: Individual post view
- **Create Post**: Form to add new travel stories
- **About Page**: Information about the application
- **Responsive Design**: Works on desktop and mobile

### Backend Features
- **RESTful API**: Clean API design
- **File Upload**: Image upload with Multer
- **Database Integration**: MongoDB with Mongoose
- **Error Handling**: Proper error responses
- **CORS Support**: Frontend-backend communication

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Irfan Samjath**
- GitHub: [@IrfanSamjath](https://github.com/IrfanSamjath)

---

⭐ If you found this project helpful, please give it a star on GitHub!
