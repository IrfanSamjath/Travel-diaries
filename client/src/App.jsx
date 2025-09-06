import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import PostDetail from "./pages/PostDetail";
import About from "./pages/About";

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL || "/"}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<PostDetail />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
