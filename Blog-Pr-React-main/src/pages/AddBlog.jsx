import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { addBlogSuccess, updateBlogSuccess } from "../redux/slices/blogSlice";
import "../styles/addblog.css";

const AddBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const isEditMode = location.pathname.includes("/edit-blog/");
  const editBlog = location.state?.blog;

  const [formData, setFormData] = useState({
    title: editBlog?.title || "",
    description: editBlog?.description || "",
    image: editBlog?.image || "",
  });

  const [imagePreview, setImagePreview] = useState(editBlog?.image || "");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Blog title is required";
    } else if (formData.title.length < 5) {
      newErrors.title = "Title must be at least 5 characters";
    } else if (formData.title.length > 100) {
      newErrors.title = "Title must not exceed 100 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Blog description is required";
    } else if (formData.description.length < 20) {
      newErrors.description = "Description must be at least 20 characters";
    } else if (formData.description.length > 2000) {
      newErrors.description = "Description must not exceed 2000 characters";
    }

    if (!formData.image) {
      newErrors.image = "Blog image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          image: "Please upload a valid image file (JPG, PNG, GIF, WebP)",
        }));
        return;
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        setErrors((prev) => ({
          ...prev,
          image: "Image size must be less than 5MB",
        }));
        return;
      }

      // Convert file to data URL for preview and storage
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result, // Store as base64
        }));
        setImagePreview(reader.result);
        setErrors((prev) => ({
          ...prev,
          image: "",
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setSuccessMessage("");

    try {
      setTimeout(() => {
        if (isEditMode && editBlog) {
          dispatch(
            updateBlogSuccess({
              ...editBlog,
              ...formData,
              updatedAt: new Date().toISOString(),
            }),
          );
          setSuccessMessage("Blog updated successfully!");
        } else {
          const newBlog = {
            id: Math.random().toString(36).substr(2, 9),
            ...formData,
            authorId: user?.id,
            authorName: user?.name,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            likes: [],
          };

          dispatch(addBlogSuccess(newBlog));
          setSuccessMessage("Blog created successfully!");
        }

        setLoading(false);

        setTimeout(() => {
          navigate("/my-blogs");
        }, 1500);
      }, 500);
    } catch (error) {
      setLoading(false);
      setErrors({ submit: error.message || "Something went wrong" });
    }
  };

  return (
    <div className="page-container">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="addblog-card">
              <h1 className="addblog-title">
                {isEditMode ? "✏️ Edit Blog" : "✍️ Create New Blog"}
              </h1>
              <p className="addblog-subtitle">
                {isEditMode
                  ? "Update your blog post"
                  : "Share your thoughts with the world"}
              </p>

              {successMessage && (
                <div
                  className="alert alert-success alert-dismissible fade show"
                  role="alert"
                >
                  <strong>Success!</strong> {successMessage}
                </div>
              )}

              {errors.submit && (
                <div
                  className="alert alert-danger alert-dismissible fade show"
                  role="alert"
                >
                  <strong>Error!</strong> {errors.submit}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="title" className="form-label fw-bold">
                    Blog Title
                  </label>
                  <input
                    type="text"
                    className={`form-control form-control-lg ${
                      errors.title ? "is-invalid" : ""
                    }`}
                    id="title"
                    name="title"
                    placeholder="Enter blog title"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                  {errors.title && (
                    <div className="invalid-feedback d-block">
                      {errors.title}
                    </div>
                  )}
                  <small className="text-muted">
                    {formData.title.length}/100
                  </small>
                </div>

                <div className="mb-4">
                  <label htmlFor="description" className="form-label fw-bold">
                    Blog Description
                  </label>
                  <textarea
                    className={`form-control form-control-lg ${
                      errors.description ? "is-invalid" : ""
                    }`}
                    id="description"
                    name="description"
                    placeholder="Write your blog content here..."
                    rows="8"
                    value={formData.description}
                    onChange={handleInputChange}
                  ></textarea>
                  {errors.description && (
                    <div className="invalid-feedback d-block">
                      {errors.description}
                    </div>
                  )}
                  <small className="text-muted">
                    {formData.description.length}/2000
                  </small>
                </div>

                <div className="mb-4">
                  <label htmlFor="image" className="form-label fw-bold">
                    Blog Image
                  </label>
                  <div className="image-upload-container">
                    <input
                      type="file"
                      className={`form-control form-control-lg ${
                        errors.image ? "is-invalid" : ""
                      }`}
                      id="image"
                      name="image"
                      accept="image/jpeg,image/png,image/gif,image/webp"
                      onChange={handleImageChange}
                    />
                    <small className="text-muted d-block mt-2">
                      📁 Supported formats: JPG, PNG, GIF, WebP (Max 5MB)
                    </small>
                  </div>
                  {errors.image && (
                    <div className="invalid-feedback d-block">
                      {errors.image}
                    </div>
                  )}

                  {imagePreview && !errors.image && (
                    <div className="mt-3">
                      <p className="text-muted mb-2">📸 Image Preview:</p>
                      <img
                        src={imagePreview}
                        alt="Blog preview"
                        className="img-preview"
                      />
                    </div>
                  )}
                </div>

                <div className="form-actions">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg fw-bold"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        {isEditMode ? "Updating..." : "Publishing..."}
                      </>
                    ) : isEditMode ? (
                      "Update Blog"
                    ) : (
                      "Publish Blog"
                    )}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary btn-lg"
                    onClick={() => navigate("/my-blogs")}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
