import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css"; 

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
      } else {
        if (data.role === "admin") navigate("/admin-dashboard");
        else if (data.role === "customer") navigate("/homepage");
        else if (data.role === "lounge_staff") navigate("/lounge-dashboard");
      }
    } catch (err) {
      setError("Error connecting to server. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-page container">
      <div className="content">
        <div className="header">
          <h2>Welcome Back!</h2>
          <p>Please enter your credentials to login</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="password-input"
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="show-password-button"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div className="options">
            <p className="link">
              {" "}
              <Link to="/forgot-password">Forgot password </Link>
            </p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? <div className="spinner"></div> : "Login"}
          </button>
        </form>

        <p className="signup-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
