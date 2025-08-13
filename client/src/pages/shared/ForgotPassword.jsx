import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"; 

const ForgotPassword = () => {
  const [universityId, setUniversityId] = useState("");
  const [universityPassword, setUniversityPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          universityId,
          universityPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Password reset failed");
      } else {
        setMessage("Password reset successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again later.");
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
          <h2>Reset Password</h2>
          <p>Enter your university credentials to reset your password</p>
        </div>

        <form onSubmit={handleReset}>
          <div className="input-group">
            <input
              type="text"
              placeholder="University ID"
              value={universityId}
              onChange={(e) => setUniversityId(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="University Password"
              value={universityPassword}
              onChange={(e) => setUniversityPassword(e.target.value)}
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

          <div className="input-group">
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}
          {message && <div className="success-message">{message}</div>}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? <div className="spinner"></div> : "Reset Password"}
          </button>
        </form>

        <p className="signup-link">
          Remembered your password? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
