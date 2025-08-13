import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [universityId, setUniversityId] = useState("");
  const [universityPassword, setUniversityPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    capitalLetter: false,
    numberOrSymbol: false,
    minLength: false,
  });
  

  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    setPasswordStrength({
      capitalLetter: /[A-Z]/.test(value),
      numberOrSymbol: /[0-9!@#$%^&*]/.test(value),
      minLength: value.length >= 8,
    });
    setPasswordTouched(true);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const nameRegex = /^[A-Za-z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !username ||
      !password ||
      !universityId ||
      !universityPassword
    ) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    if (!nameRegex.test(firstName.trim())) {
      setError("First name must only contain letters.");
      setLoading(false);
      return;
    }

    if (!nameRegex.test(lastName.trim())) {
      setError("Last name must only contain letters.");
      setLoading(false);
      return;
    }

    if (/^\d+$/.test(username.trim())) {
      setError("Username cannot be only numbers.");
      setLoading(false);
      return;
    }

    if (!emailRegex.test(email.trim())) {
      setError("Invalid email format.");
      setLoading(false);
      return;
    }

  
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      setLoading(false);
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter.");
      setLoading(false);
      return;
    }

    if (!/[0-9!@#$%^&*]/.test(password)) {
      setError("Password must contain at least one number or symbol.");
      setLoading(false);
      return;
    }

    try {
      const trimmedFirstName = firstName.trim();
      const trimmedLastName = lastName.trim();
      const trimmedUsername = username.trim();
      const trimmedEmail = email.trim().toLowerCase();
      const trimmedUniversityId = universityId.trim();
      const trimmedUniversityPassword = universityPassword;

      const response = await fetch("/api/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fName: trimmedFirstName,
          lName: trimmedLastName,
          email: trimmedEmail,
          username: trimmedUsername,
          password,
          universityId: trimmedUniversityId,
          universityPassword: trimmedUniversityPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed");
      } else {
        alert("Registration successful!");
        navigate("/homepage");
      }
    } catch (err) {
      setError("Error connecting to server. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page container">
      <div className="content">
        <div className="header">
          <h2>Create Your Account</h2>
          <p>Join us today to get started</p>
        </div>

        <form onSubmit={handleRegister}>
          <div className="input-group">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

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
              onChange={handlePasswordChange}
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

          {passwordTouched && (
            <div className="password-strength">
              <p
                className={
                  passwordStrength.minLength &&
                  passwordStrength.capitalLetter &&
                  passwordStrength.numberOrSymbol
                    ? "valid"
                    : "invalid"
                }
              >
                Password strength:{" "}
                {passwordStrength.minLength &&
                passwordStrength.capitalLetter &&
                passwordStrength.numberOrSymbol
                  ? "strong"
                  : "weak"}
              </p>
              <ul>
                <li
                  className={
                    passwordStrength.capitalLetter ? "valid" : "invalid"
                  }
                >
                  At least one capital letter
                </li>
                <li
                  className={
                    passwordStrength.numberOrSymbol ? "valid" : "invalid"
                  }
                >
                  Contains a number or symbol
                </li>
                <li
                  className={passwordStrength.minLength ? "valid" : "invalid"}
                >
                  At least 8 characters
                </li>
              </ul>
            </div>
          )}

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
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="terms">
            <label>
              <input type="checkbox" required />I agree to the Terms of Service
              and Privacy Policy
            </label>
          </div>

          <button type="submit" className="register-button" disabled={loading}>
            {loading ? <div className="spinner"></div> : "Register"}
          </button>
        </form>

        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
