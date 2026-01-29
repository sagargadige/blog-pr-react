import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";
import "../styles/navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          📝 Blogs
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/my-blogs">
                    My Blogs
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/add-blog">
                    Add Blog
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle btn btn-link"
                    type="button"
                    id="userDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)",
                      fontSize: "0.95rem",
                      fontWeight: "800",
                      color: "#f5f5f5",
                      boxShadow: "0 3px 10px rgba(192, 57, 43, 0.25)",
                      flexShrink: 0
                    }}>
                      {user?.name.charAt(0).toUpperCase()}
                    </span>
                    {user?.name}
                  </button>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="userDropdown"
                  >
                    <li style={{
                      padding: "1.2rem 1.4rem",
                      borderBottom: "2px solid rgba(192, 57, 43, 0.2)",
                      marginBottom: "0.6rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem"
                    }}>
                      <span style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "45px",
                        height: "45px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)",
                        fontSize: "1.3rem",
                        fontWeight: "800",
                        color: "#f5f5f5",
                        boxShadow: "0 6px 16px rgba(192, 57, 43, 0.35)"
                      }}>
                        {user?.name.charAt(0).toUpperCase()}
                      </span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "0.8rem", color: "#d4a574", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                          User Profile
                        </div>
                        <div style={{ color: "#f0f0f0", fontWeight: "700", marginTop: "0.4rem", fontSize: "1rem" }}>
                          {user?.name}
                        </div>
                        <div style={{ color: "#b8914e", fontSize: "0.8rem", marginTop: "0.2rem" }}>
                          {user?.email}
                        </div>
                      </div>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout} style={{
                        background: "linear-gradient(135deg, rgba(231, 76, 60, 0.15) 0%, rgba(192, 57, 43, 0.1) 100%)",
                        border: "1.5px solid rgba(192, 57, 43, 0.3)",
                        borderRadius: "10px",
                        color: "#e74c3c",
                        fontWeight: "700",
                        marginTop: "0.4rem",
                        marginBottom: "0.4rem",
                        transition: "all 0.3s ease"
                      }} onMouseEnter={(e) => {
                        e.target.style.background = "linear-gradient(135deg, rgba(231, 76, 60, 0.25) 0%, rgba(192, 57, 43, 0.15) 100%)";
                        e.target.style.borderColor = "#e74c3c";
                        e.target.style.boxShadow = "0 6px 16px rgba(192, 57, 43, 0.25)";
                      }} onMouseLeave={(e) => {
                        e.target.style.background = "linear-gradient(135deg, rgba(231, 76, 60, 0.15) 0%, rgba(192, 57, 43, 0.1) 100%)";
                        e.target.style.borderColor = "rgba(192, 57, 43, 0.3)";
                        e.target.style.boxShadow = "none";
                      }}>
                        <span style={{ marginRight: "0.8rem", fontSize: "1.1rem" }}>🚪</span>
                        Sign Out
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
