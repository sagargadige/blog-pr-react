import React from "react";
import { useSelector } from "react-redux";
import BlogCard from "../components/BlogCard";
import "../styles/pages.css";

const Home = () => {
  const { blogs } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="page-container">
      <div className="container py-5">
        <div className="page-header mb-5">
          <h1 className="page-title">📚 All Blogs</h1>
          <p className="page-subtitle">
            Explore amazing articles from our community
          </p>
        </div>

        {blogs.length === 0 ? (
          <div className="empty-state text-center py-5">
            <div className="empty-icon">📭</div>
            <h3>No blogs yet</h3>
            <p className="text-muted">Be the first to share your thoughts!</p>
          </div>
        ) : (
          <div className="blogs-grid">
            {blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                showActions={blog.authorId === user?.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
