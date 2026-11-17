import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../service/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/auth.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await api.post("/api/users/register", {
        name,
        email,
        password,
        phone
      });

      setMessage(response.data.message || "Registration successful! Redirecting to login...");
      setIsError(false);

      setName("");
      setEmail("");
      setPassword("");
      setPhone("");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        error.message ||
        "Registration failed. Please try again."
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
            <h1 className="auth-title">Create Corporate Account</h1>
            <p className="auth-subtitle">
              Join thousands of businesses unlocking exclusive hotel discounts across India
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mmt-form-group">
              <label className="mmt-label">Full Name</label>
              <input
                className="mmt-input"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mmt-form-group">
              <label className="mmt-label">Work Email Address</label>
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
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="mmt-form-group">
              <label className="mmt-label">Phone Number</label>
              <input
                className="mmt-input"
                type="tel"
                placeholder="Enter 10-digit mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="mmt-btn mmt-btn-primary auth-submit-btn"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Sign up Now →"}
            </button>
          </form>

          {message && (
            <div className={`alert-box ${isError ? "alert-error" : "alert-success"}`}>
              <span>{isError ? "⚠️" : "✓"}</span>
              <span>{message}</span>
            </div>
          )}

          <div className="auth-footer">
            <span>Already registered with us?</span>
            <Link to="/login" className="auth-link">
              Login to Account
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Register;
