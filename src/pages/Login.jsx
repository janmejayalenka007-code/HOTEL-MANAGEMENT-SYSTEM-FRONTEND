import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../service/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/auth.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await api.post("/api/users/login", {
        email,
        password
      });

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      if (response.data && response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      setMessage(response.data.message || "Login successful! Redirecting...");
      setIsError(false);

      setEmail("");
      setPassword("");

      setTimeout(() => {
        navigate("/search-hotels");
      }, 1500);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please check your credentials."
      );
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <Navbar />

      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo-badge">
              <span>🏨</span>
              <span>HOTEL AGGREGATOR SYSTEM</span>
            </div>
            <h1 className="auth-title">Corporate Login</h1>
            <p className="auth-subtitle">
              Sign in to access corporate discounts, manage bookings and download invoices
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mmt-form-group">
              <label className="mmt-label">Work Email / Username</label>
              <input
                className="mmt-input"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mmt-form-group">
              <label className="mmt-label">Password</label>
              <input
                className="mmt-input"
                type="password"
                placeholder="Enter your account password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="mmt-btn mmt-btn-primary auth-submit-btn"
              disabled={loading}
            >
              {loading ? "Authenticating..." : "Login to myBiz Account →"}
            </button>
          </form>

          {message && (
            <div className={`alert-box ${isError ? "alert-error" : "alert-success"}`}>
              <span>{isError ? "⚠️" : "✓"}</span>
              <span>{message}</span>
            </div>
          )}

          <div className="auth-footer">
            <span>Don't have an account yet?</span>
            <Link to="/register" className="auth-link">
              Sign up
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Login;
