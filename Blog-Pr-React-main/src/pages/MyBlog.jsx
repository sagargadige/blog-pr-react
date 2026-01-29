import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import { deleteBlogSuccess } from "../redux/slices/blogSlice";
import "../styles/pages.css";

const MyBlog = () => {
  const { blogs } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const myBlogs = blogs.filter((blog) => blog.authorId === user?.id);

  React.useEffect(() => {
    const handleDeleteBlog = (event) => {
      dispatch(deleteBlogSuccess(event.detail));
    };

    window.addEventListener("deleteBlog", handleDeleteBlog);
    return () => window.removeEventListener("deleteBlog", handleDeleteBlog);
  }, [dispatch]);

  return (
    <div className="page-container">
      <div className="container py-5">
        <div className="page-header mb-5">
          <h1 className="page-title">📖 My Blogs</h1>
          <p className="page-subtitle">Manage your published articles</p>
        </div>

        {myBlogs.length === 0 ? (
          <div className="empty-state text-center py-5">
            <div className="empty-icon">📝</div>
            <h3>No blogs yet</h3>
            <p className="text-muted">Start creating your first blog post</p>
            <button
              className="btn btn-primary mt-3"
              onClick={() => navigate("/add-blog")}
            >
              Create Blog
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <p className="text-muted">
                You have <strong>{myBlogs.length}</strong> blog post(s)
              </p>
            </div>
            <div className="blogs-grid">
              {myBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} showActions={true} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyBlog;
