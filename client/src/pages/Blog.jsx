import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import PostCard from "../components/PostCard";
import BlogForm from "../components/BlogForm";

function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.get("/posts");
      setPosts(response.data);
    } catch (err) {
      console.error("Error fetching posts", err);
    }
  };

  const handlePostCreated = (newPost) => {
    setPosts(prev => [newPost, ...prev]);
  };

  return (
    <div>
      <h1>Travel Blog</h1>
      
      {/* Blog creation form */}
      <BlogForm onPostCreated={handlePostCreated} />
      
      {/* Posts list */}
      {posts.length === 0 ? (
        <p>No posts yet. Be the first to share your journey! ✨</p>
      ) : (
        posts.map((post) => (
          <Link key={post._id} to={`/blog/${post._id}`}>
            <PostCard post={post} />
          </Link>
        ))
      )}
    </div>
  );
}

export default Blog;
