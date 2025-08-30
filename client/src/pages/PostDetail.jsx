import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await api.get(`/posts/${id}`);
        setPost(data);
      } catch (err) {
        console.error("Error loading post", err);
      }
    };
    fetchPost();
  }, [id]);

  if (!post) return <p>Loading...</p>;

  // Construct full image URL by prepending backend base URL
  const fullImageUrl = post.imageUrl 
    ? `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/${post.imageUrl.replace(/\\/g, "/")}`
    : null;

  return (
    <div>
      <h1>{post.title}</h1>
      {fullImageUrl && <img src={fullImageUrl} alt={post.title} width="400" />}
      <p>{post.content}</p>
      <p><i>By {post.author} on {new Date(post.createdAt).toLocaleDateString()}</i></p>
    </div>
  );
}

export default PostDetail;
