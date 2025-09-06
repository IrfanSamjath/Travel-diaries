import "./PostCard.css";

function PostCard({ post }) {
  // Construct full image URL by prepending backend base URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;

    // If image path already includes full URL, use it as is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }

    // Remove leading slash if present and construct full URL
    const cleanPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
    const baseUrl = import.meta.env.VITE_API_URL || "https://travel-diaries-ekeo.onrender.com";

    return `${baseUrl}/${cleanPath}`;
  };

  const fullImageUrl = getImageUrl(post.image);

  return (
    <div className="post-card">
      {fullImageUrl && <img src={fullImageUrl} alt={post.title} onError={(e) => {
        console.error('Image failed to load:', fullImageUrl);
        e.target.style.display = 'none';
      }} />}
      <h3>{post.title}</h3>
      <p>{post.content ? post.content.substring(0, 100) + '...' : 'No content available'}</p>
      <small>By: {post.author || 'Anonymous'}</small>
    </div>
  );
}

export default PostCard;
