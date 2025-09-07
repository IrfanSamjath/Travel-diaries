import { useState, useRef } from "react";
import api from "../api/axios";
import "./BlogForm.css";

function BlogForm({ onPostCreated }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    image: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const postData = new FormData();
      postData.append('title', formData.title);
      postData.append('content', formData.content);
      postData.append('author', formData.author);
      postData.append('tags', JSON.stringify([])); // Empty tags array for now

      if (formData.image) {
        postData.append('image', formData.image);
      }

      console.log("Submitting post data:", {
        title: formData.title,
        content: formData.content,
        author: formData.author,
        hasImage: !!formData.image
      });

      const response = await api.post("/blog", postData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("✅ Post created:", response.data);
      if (onPostCreated) {
        onPostCreated(response.data);
      }

      // Reset form
      setFormData({ title: "", content: "", author: "", image: null });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("❌ Failed to create post:", error);
      if (error.response) {
        // Server responded with error status
        console.error("❌ Server error:", error.response.status, error.response.data);
        alert(`Failed to create post: ${error.response.data.message || 'Server error'}`);
      } else if (error.request) {
        // Network error
        console.error("❌ Network error:", error.request);
        alert("Network error. Please check your connection and try again.");
      } else {
        // Other error
        console.error("❌ Error:", error.message);
        alert(`Error: ${error.message}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="blog-form-container">
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit} className="blog-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            placeholder="Enter post title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            required
            placeholder="Enter author name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            required
            rows="5"
            placeholder="Write your blog post content..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Upload Image (Optional)</label>
          <input
            type="file"
            id="image"
            name="image"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
          />
          {formData.image && (
            <p className="file-info">Selected: {formData.image.name}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="submit-btn"
        >
          {isSubmitting ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}

export default BlogForm;
