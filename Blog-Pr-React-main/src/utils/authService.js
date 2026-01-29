// Mock authentication for demo purposes
// In a real app, these would make actual API calls to a backend

export const authenticateUser = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simple validation
      if (!email || !password) {
        reject("Email and password are required");
        return;
      }
      if (!email.includes("@")) {
        reject("Invalid email format");
        return;
      }

      // Get registered users from localStorage
      const registeredUsers = JSON.parse(localStorage.getItem("users")) || [];

      // Check if user exists
      const user = registeredUsers.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (!user) {
        reject("User not found. Please sign up first.");
        return;
      }

      // Check if password matches
      if (user.password !== password) {
        reject("Invalid password. Please try again.");
        return;
      }

      // Authentication successful
      const token = "mock_token_" + Math.random().toString(36).substr(2, 9);

      resolve({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        token,
      });
    }, 500);
  });
};

export const registerUser = (email, password, name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simple validation
      if (!email || !password || !name) {
        reject("All fields are required");
        return;
      }
      if (password.length < 6) {
        reject("Password must be at least 6 characters");
        return;
      }
      if (!email.includes("@")) {
        reject("Invalid email format");
        return;
      }
      if (name.length < 2) {
        reject("Name must be at least 2 characters");
        return;
      }

      // Get existing users from localStorage
      const registeredUsers = JSON.parse(localStorage.getItem("users")) || [];

      // Check if user already exists
      const existingUser = registeredUsers.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (existingUser) {
        reject("Email already registered. Please login instead.");
        return;
      }

      // Create new user
      const user = {
        id: Math.random().toString(36).substr(2, 9),
        email: email,
        name: name,
        password: password, // In real app, this should be hashed
      };

      // Add user to registered users list
      registeredUsers.push(user);
      localStorage.setItem("users", JSON.stringify(registeredUsers));

      const token = "mock_token_" + Math.random().toString(36).substr(2, 9);

      resolve({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        token,
      });
    }, 500);
  });
};
