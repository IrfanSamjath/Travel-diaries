import "./PostCard.css";

function PostCard({ post }) {
  // Construct full image URL by prepending backend base URL
  const fullImageUrl = post.imageUrl 
    ? `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/${post.imageUrl.replace(/\\/g, "/")}`
    : null;

  return (
    <div className="post-card">
      {fullImageUrl && <img src={fullImageUrl} alt={post.title} />}
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}...</p>
    </div>
  );
}

export default PostCard;
