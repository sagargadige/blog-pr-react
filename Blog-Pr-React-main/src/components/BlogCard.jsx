import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { likeBlog } from "../redux/slices/blogSlice";
import "../styles/blogcard.css";

const BlogCard = ({ blog, showActions = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleEdit = (e) => {
    e.preventDefault();
    navigate(`/edit-blog/${blog.id}`, { state: { blog } });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this blog?")) {
      // Delete logic will be handled in parent component
      window.dispatchEvent(new CustomEvent("deleteBlog", { detail: blog.id }));
    }
  };

  const handleLike = (e) => {
    e.preventDefault();
    if (user?.id) {
      dispatch(likeBlog({ blogId: blog.id, userId: user.id }));
    }
  };

  const isLiked = blog.likes && blog.likes.includes(user?.id);
  const likeCount = blog.likes ? blog.likes.length : 0;

  return (
    <div className="blog-card">
      <div className="blog-image-container">
        <img
          src={
            blog.image || "https://via.placeholder.com/400x250?text=No+Image"
          }
          alt={blog.title}
          className="blog-image"
        />
      </div>

      <div className="blog-content">
        <h3 className="blog-title">{blog.title}</h3>
        <p className="blog-description">{blog.description}</p>

        <div className="blog-footer">
          <div className="blog-meta">
            <span className="author-badge">✍️ {blog.authorName}</span>
            <span className="date-badge">
              📅 {new Date(blog.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="blog-interactions">
            <button
              className={`btn btn-sm like-btn ${isLiked ? "liked" : ""}`}
              onClick={handleLike}
              title="Like this blog"
            >
              {isLiked ? "❤️" : "🤍"} {likeCount}
            </button>

            {showActions && (
              <div className="blog-actions">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={handleEdit}
                >
                  ✏️ Edit
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={handleDelete}
                >
                  🗑️ Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
