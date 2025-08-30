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
      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("content", formData.content);
      submitData.append("author", formData.author);
      if (formData.image) {
        submitData.append("image", formData.image);
      }

      console.log("Submitting post data:", {
        title: formData.title,
        content: formData.content,
        author: formData.author,
        hasImage: !!formData.image
      });

      const { data } = await api.post("/posts", submitData);

      console.log("Post created successfully:", data);
      onPostCreated(data);

      // Reset form
      setFormData({ title: "", content: "", author: "", image: null });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      console.error("Error creating post", err);

      if (err.response) {
        console.error("Backend error response:", err.response.data);
        console.error("Status:", err.response.status);
        alert(`Failed: ${err.response.status} - ${JSON.stringify(err.response.data)}`);
      } else if (err.request) {
        console.error("No response received:", err.request);
        alert("Failed: No response from server. Check if backend is running.");
      } else {
        console.error("Request setup error:", err.message);
        alert(`Error: ${err.message}`);
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
