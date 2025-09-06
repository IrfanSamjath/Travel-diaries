import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/posts/${id}`);
        setPost(response.data);
      } catch (err) {
        console.error("Error loading post", err);
      }
    };
    fetchPost();
  }, [id]);

  if (!post) return <p>Loading...</p>;

  // Construct full image URL by prepending backend base URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;

    // If image path already includes full URL, use it as is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }

    // Remove leading slash if present and construct full URL
    const cleanPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
    const baseUrl = import.meta.env.VITE_API_URL || "https://travel-diaries-backend-e8ud.onrender.com";

    return `${baseUrl}/${cleanPath}`;
  };

  const fullImageUrl = getImageUrl(post.image);

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
