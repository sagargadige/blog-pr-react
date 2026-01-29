import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: JSON.parse(localStorage.getItem("blogs")) || [],
  loading: false,
  error: null,
  success: false,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlogs: (state, action) => {
      state.blogs = action.payload;
      localStorage.setItem("blogs", JSON.stringify(action.payload));
    },
    addBlogStart: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    addBlogSuccess: (state, action) => {
      state.loading = false;
      state.blogs.push(action.payload);
      state.success = true;
      localStorage.setItem("blogs", JSON.stringify(state.blogs));
    },
    addBlogFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    updateBlogStart: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    updateBlogSuccess: (state, action) => {
      state.loading = false;
      const index = state.blogs.findIndex(
        (blog) => blog.id === action.payload.id,
      );
      if (index !== -1) {
        state.blogs[index] = action.payload;
      }
      state.success = true;
      localStorage.setItem("blogs", JSON.stringify(state.blogs));
    },
    updateBlogFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    deleteBlogStart: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    deleteBlogSuccess: (state, action) => {
      state.loading = false;
      state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
      state.success = true;
      localStorage.setItem("blogs", JSON.stringify(state.blogs));
    },
    deleteBlogFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    likeBlog: (state, action) => {
      const { blogId, userId } = action.payload;
      const blog = state.blogs.find((blog) => blog.id === blogId);
      if (blog) {
        if (!blog.likes) {
          blog.likes = [];
        }
        const likeIndex = blog.likes.indexOf(userId);
        if (likeIndex === -1) {
          blog.likes.push(userId);
        } else {
          blog.likes.splice(likeIndex, 1);
        }
        localStorage.setItem("blogs", JSON.stringify(state.blogs));
      }
    },
  },
});

export const {
  setBlogs,
  addBlogStart,
  addBlogSuccess,
  addBlogFailure,
  updateBlogStart,
  updateBlogSuccess,
  updateBlogFailure,
  deleteBlogStart,
  deleteBlogSuccess,
  deleteBlogFailure,
  clearSuccess,
  clearError,
  likeBlog,
} = blogSlice.actions;

export default blogSlice.reducer;
