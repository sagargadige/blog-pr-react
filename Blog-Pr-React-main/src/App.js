import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setBlogs } from "./redux/slices/blogSlice";

// Components
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import MyBlog from "./pages/MyBlog";
import AddBlog from "./pages/AddBlog";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Styles
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    // Load blogs from localStorage on app mount
    const savedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];

    // Check if we have old sample blogs with non-Indian names
    const hasOldSampleBlogs = savedBlogs.some(
      (blog) => blog.authorId && blog.authorId.startsWith("demo-user"),
    );

    const sampleBlogs = [
      {
        id: "1",
        title: "Modern Web Development with React",
        description:
          "Discover the power of modern web development using React.js. Build interactive and responsive user interfaces with cutting-edge JavaScript frameworks. Learn component-based architecture, hooks, state management, and how to create seamless user experiences. Perfect for developers looking to master contemporary web technologies and industry best practices.",
        image: "https://loremflickr.com/500/250/development,programming",
        authorName: "Raj Kumar",
        authorId: "demo-user",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        likes: [],
      },
      {
        id: "2",
        title: "Building Scalable Applications",
        description:
          "Learn how to architect and build scalable applications that grow with your business. Explore design patterns, state management solutions, performance optimization, and best practices for handling complex application logic. This comprehensive guide covers everything you need to create production-ready applications that can handle millions of users.",
        image: "https://loremflickr.com/500/250/architecture,technology",
        authorName: "Priya Sharma",
        authorId: "demo-user-2",
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        likes: [],
      },
      {
        id: "3",
        title: "Creative Web Design & Styling",
        description:
          "Master the art of web design and create stunning visual interfaces. Learn responsive design principles, modern CSS techniques, animations, and styling strategies that make websites beautiful and user-friendly. Explore layouts, typography, color theory, and accessibility best practices to build websites that users love.",
        image: "https://picsum.photos/500/250?random=3",
        authorName: "Vikram Patel",
        authorId: "demo-user-3",
        createdAt: new Date(Date.now() - 259200000).toISOString(),
        likes: [],
      },
    ];

    if (savedBlogs.length === 0) {
      // Initialize with sample blogs if no blogs exist
      dispatch(setBlogs(sampleBlogs));
    } else if (hasOldSampleBlogs) {
      // Replace old sample blogs with updated ones that have Indian names
      const userBlogs = savedBlogs.filter(
        (blog) => !blog.authorId || !blog.authorId.startsWith("demo-user"),
      );
      const updatedBlogs = [...sampleBlogs, ...userBlogs];
      dispatch(setBlogs(updatedBlogs));
      localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
    } else {
      dispatch(setBlogs(savedBlogs));
    }
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/" replace /> : <Signup />}
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-blogs"
          element={
            <ProtectedRoute>
              <MyBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-blog"
          element={
            <ProtectedRoute>
              <AddBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-blog/:id"
          element={
            <ProtectedRoute>
              <AddBlog />
            </ProtectedRoute>
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
