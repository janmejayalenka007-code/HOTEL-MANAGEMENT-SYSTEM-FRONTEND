import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const email = localStorage.getItem("userEmail") || "";
    setIsLoggedIn(loggedIn);
    setUserEmail(email);
  }, [location.pathname]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? "nav-link active" : "nav-link";
  };

  const handleProtectedLink = (e, targetPath) => {
    e.preventDefault();
    setMenuOpen(false);
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate(targetPath);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserEmail("");
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <div className="brand-logo-icon">🏨</div>
          <div className="brand-text-group">
            <span className="brand-title">HOTEL AGGREGATOR SYSTEM</span>
            <span className="brand-badge">myBiz Corporate</span>
          </div>
        </Link>

        <button 
          className="navbar-hamburger" 
          onClick={toggleMenu} 
          aria-label="Toggle navigation menu"
        >
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
        </button>

        <nav className={`navbar-nav ${menuOpen ? "open" : ""}`}>
          <div className="nav-menu">
            <Link to="/" className={isActive("/")} onClick={() => setMenuOpen(false)}>
              <span className="nav-icon">🏠</span>
              <span>Home</span>
            </Link>

            <a
              href="/search-hotels"
              className={isActive("/search-hotels")}
              onClick={(e) => handleProtectedLink(e, "/search-hotels")}
            >
              <span className="nav-icon">🔍</span>
              <span>Search Hotels</span>
            </a>

            <a
              href="/my-bookings"
              className={location.pathname.startsWith("/my-bookings") ? "nav-link active" : "nav-link"}
              onClick={(e) => handleProtectedLink(e, userEmail ? `/my-bookings/${userEmail}` : "/search-hotels")}
            >
              <span className="nav-icon">📋</span>
              <span>My Bookings</span>
            </a>
          </div>

          <div className="nav-actions">
            {isLoggedIn ? (
              <>
                <span className="nav-user-pill" title={userEmail}>
                  👤 {userEmail ? (userEmail.length > 20 ? `${userEmail.substring(0, 17)}...` : userEmail) : "Corporate Member"}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="nav-btn nav-btn-outline"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-btn nav-btn-outline" onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/register" className="nav-btn nav-btn-primary" onClick={() => setMenuOpen(false)}>
                  Sign up
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
