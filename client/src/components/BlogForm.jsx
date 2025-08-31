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
      const newBlog = {
        title: formData.title,
        content: formData.content,
        author: formData.author
      };

      console.log("Submitting blog data:", newBlog);

      const res = await fetch("http://localhost:10000/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBlog),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Server error: ${res.status} ${errText}`);
      }

      const data = await res.json();
      console.log("✅ Blog created:", data);
      onPostCreated(data);

      // Reset form
      setFormData({ title: "", content: "", author: "", image: null });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      console.error("❌ Failed to save blog:", err);
      alert("Could not save blog. Please try again later.");
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
