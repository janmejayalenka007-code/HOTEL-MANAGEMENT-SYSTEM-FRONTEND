import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Home.css";

function Home() {
  const [searchCity, setSearchCity] = useState("");
  const navigate = useNavigate();

  const handleProtectedAction = (e, targetPath = "/search-hotels") => {
    if (e && e.preventDefault) e.preventDefault();
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate(targetPath);
    }
  };

  const handleCitySearch = (e) => {
    e.preventDefault();
    handleProtectedAction(e, "/search-hotels");
  };

  return (
    <div className="home-page">
      <Navbar />

      {/* Hero Section */}
      <section className="mmt-hero">
        <div className="hero-container">
          <div className="hero-badge">
            <span>INDIA'S LEADING HOTEL AGGREGATOR PLATFORM</span>
          </div>

          <h1 className="hero-welcome">WELCOME TO</h1>
          <h1 className="hero-title">HOTEL AGGREGATOR SYSTEM</h1>

          <p className="hero-subtitle">
            Find Hotels Across India • Luxury Stay • Premium Experience
          </p>

          {/* Floating Search Widget (MakeMyTrip / myBiz style) */}
          <div className="mmt-search-card">
            <div className="search-tabs">
              <button
                type="button"
                className="tab-item active"
                onClick={(e) => handleProtectedAction(e, "/search-hotels")}
              >
                <span className="tab-icon">🏨</span>
                <span>All Hotels</span>
              </button>
              <button
                type="button"
                className="tab-item"
                onClick={(e) => handleProtectedAction(e, "/search-hotels")}
              >
                <span className="tab-icon">💼</span>
                <span>Corporate Rates</span>
              </button>
              <button
                type="button"
                className="tab-item"
                onClick={(e) => handleProtectedAction(e, "/search-hotels")}
              >
                <span className="tab-icon">⭐</span>
                <span>Luxury Stays</span>
              </button>
            </div>

            <form onSubmit={handleCitySearch} className="search-form-row">
              <div className="search-input-box">
                <span className="input-icon">📍</span>
                <div className="input-content">
                  <label htmlFor="city-input">CITY / LOCATION</label>
                  <input
                    id="city-input"
                    type="text"
                    placeholder="Enter City (e.g. Bhubaneswar, Delhi, Goa)"
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                  />
                </div>
              </div>

              <div className="search-input-box disabled-hint">
                <span className="input-icon">📅</span>
                <div className="input-content">
                  <label>CHECK-IN & CHECK-OUT</label>
                  <input type="text" readOnly value="Flexible Dates Available" />
                </div>
              </div>

              <div className="search-input-box disabled-hint">
                <span className="input-icon">👥</span>
                <div className="input-content">
                  <label>ROOMS & GUESTS</label>
                  <input type="text" readOnly value="1 Room, 2 Adults" />
                </div>
              </div>

              <button type="submit" className="search-submit-btn">
                <span>SEARCH</span>
                <span className="btn-arrow">→</span>
              </button>
            </form>

            <div className="hero-cta-group">
              <Link to="/register" className="mmt-btn mmt-btn-primary">
                Sign up
              </Link>
              <Link to="/login" className="mmt-btn mmt-btn-outline">
                Login
              </Link>
              <button
                type="button"
                className="mmt-btn mmt-btn-secondary"
                onClick={(e) => handleProtectedAction(e, "/search-hotels")}
              >
                View All Hotels
              </button>
            </div>
          </div>

          {/* Trust Value Badges */}
          <div className="hero-trust-bar">
            <div className="trust-item">
              <span className="trust-check">✓</span>
              <span>Exclusive Corporate Rates</span>
            </div>
            <div className="trust-item">
              <span className="trust-check">✓</span>
              <span>100% Verified Properties</span>
            </div>
            <div className="trust-item">
              <span className="trust-check">✓</span>
              <span>Instant GST Invoicing</span>
            </div>
            <div className="trust-item">
              <span className="trust-check">✓</span>
              <span>24x7 Concierge Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats-section">
        <div className="container stats-grid">
          <div className="stat-card">
            <div className="stat-number">5,000+</div>
            <div className="stat-label">Verified Hotels</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">250+</div>
            <div className="stat-label">Cities Covered</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">4.8 ★</div>
            <div className="stat-label">Customer Satisfaction</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">24x7</div>
            <div className="stat-label">Dedicated Support</div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container about-container">
          <div className="about-content">
            <span className="section-pill">ABOUT US</span>
            <h2 className="section-title">About Hotel Aggregator System</h2>
            <p className="about-lead">
              Hotel Aggregator System provides premium accommodation, luxury rooms,
              secure online booking and excellent customer service.
            </p>
            <p className="about-description">
              Our mission is to provide affordable luxury and a comfortable stay
              experience for every guest. Whether traveling for corporate meetings,
              leisure getaways, or family holidays, our aggregated platform brings you
              verified rooms at guaranteed best prices across India.
            </p>
            <div className="about-features-list">
              <div className="about-check-item">
                <span className="check-icon">✓</span>
                <span>Pan-India Network of Partner Hotels</span>
              </div>
              <div className="about-check-item">
                <span className="check-icon">✓</span>
                <span>Transparent Pricing with No Hidden Fees</span>
              </div>
              <div className="about-check-item">
                <span className="check-icon">✓</span>
                <span>Seamless Real-time Confirmation & Check-in</span>
              </div>
            </div>
            <div className="about-actions">
              <button
                type="button"
                onClick={(e) => handleProtectedAction(e, "/search-hotels")}
                className="mmt-btn mmt-btn-primary"
              >
                Explore Hotels Now
              </button>
            </div>
          </div>

          <div className="about-visual-card">
            <div className="visual-card-inner">
              <div className="hotel-mock-badge">⭐ 4.9 Superhost Assured</div>
              <div className="mock-hotel-name">Grand Aggregator Suites</div>
              <div className="mock-hotel-location">📍 Bhubaneswar • Delhi • Bengaluru • Goa</div>
              <div className="mock-amenities-row">
                <span>Free High-Speed Wi-Fi</span>
                <span>•</span>
                <span>Swimming Pool</span>
                <span>•</span>
                <span>Multi-Cuisine Buffet</span>
              </div>
              <div className="mock-price-row">
                <div>
                  <span className="mock-price-label">Starting from</span>
                  <span className="mock-price-val">₹2,499</span>
                  <span className="mock-price-unit"> / night</span>
                </div>
                <button
                  type="button"
                  className="mmt-badge mmt-badge-green"
                  onClick={(e) => handleProtectedAction(e, "/search-hotels")}
                  style={{ border: "none", cursor: "pointer" }}
                >
                  Instant Book
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <div className="section-header">
            <span className="section-pill">WHAT WE OFFER</span>
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle">
              Tailored hospitality solutions designed for individuals and corporate teams.
            </p>
          </div>

          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon-box">🛏️</div>
              <h3 className="service-title">Luxury Rooms</h3>
              <p className="service-desc">
                Handpicked premium suites with world-class amenities, scenic views, and supreme comfort.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon-box">💻</div>
              <h3 className="service-title">Online Booking</h3>
              <p className="service-desc">
                Instant real-time room availability, live confirmation, and digital booking vouchers.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon-box">💳</div>
              <h3 className="service-title">Secure Payment</h3>
              <p className="service-desc">
                Multiple secure payment modes including PhonePe, Google Pay, UPI, and major cards.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon-box">🔄</div>
              <h3 className="service-title">Easy Cancellation</h3>
              <p className="service-desc">
                Flexible cancellation policies with transparent refunds and instant cancellation previews.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon-box">📞</div>
              <h3 className="service-title">24x7 Support</h3>
              <p className="service-desc">
                Round-the-clock dedicated customer assistance desk ready to help you at every step.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon-box">🧾</div>
              <h3 className="service-title">Corporate Invoicing</h3>
              <p className="service-desc">
                Simplified GST-compliant billing and consolidated expense management for companies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Cities Quick Link Grid */}
      <section className="cities-section">
        <div className="container">
          <div className="section-header">
            <span className="section-pill">TOP DESTINATIONS</span>
            <h2 className="section-title">Explore Hotels Across India</h2>
            <p className="section-subtitle">
              Book curated stays in India's top metropolitan and holiday destinations.
            </p>
          </div>

          <div className="cities-grid">
            <div
              className="city-card"
              onClick={(e) => handleProtectedAction(e, "/search-hotels")}
              style={{ cursor: "pointer" }}
            >
              <div className="city-card-header">
                <span className="city-icon">🏛️</span>
                <span className="city-badge">Smart City</span>
              </div>
              <h4 className="city-name">Bhubaneswar</h4>
              <p className="city-sub">450+ Verified Stays</p>
            </div>

            <div
              className="city-card"
              onClick={(e) => handleProtectedAction(e, "/search-hotels")}
              style={{ cursor: "pointer" }}
            >
              <div className="city-card-header">
                <span className="city-icon">🏛️</span>
                <span className="city-badge">Capital Region</span>
              </div>
              <h4 className="city-name">Delhi NCR</h4>
              <p className="city-sub">750+ Verified Stays</p>
            </div>

            <div
              className="city-card"
              onClick={(e) => handleProtectedAction(e, "/search-hotels")}
              style={{ cursor: "pointer" }}
            >
              <div className="city-card-header">
                <span className="city-icon">💼</span>
                <span className="city-badge">Tech Capital</span>
              </div>
              <h4 className="city-name">Bengaluru</h4>
              <p className="city-sub">620+ Verified Stays</p>
            </div>

            <div
              className="city-card"
              onClick={(e) => handleProtectedAction(e, "/search-hotels")}
              style={{ cursor: "pointer" }}
            >
              <div className="city-card-header">
                <span className="city-icon">🏖️</span>
                <span className="city-badge">Holiday Destination</span>
              </div>
              <h4 className="city-name">Goa</h4>
              <p className="city-sub">500+ Luxury Resorts</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="contact-card">
            <div className="contact-info">
              <span className="section-pill light">24x7 ASSISTANCE</span>
              <h2 className="contact-title">Contact Us</h2>
              <p className="contact-desc">
                Have questions or need assistance with your booking? Our dedicated concierge
                team is available around the clock.
              </p>
              <div className="contact-items-list">
                <div className="contact-detail-row">
                  <span className="contact-icon-large">📞</span>
                  <div>
                    <strong>Support Available 24x7</strong>
                    <p>Toll-Free Helpline: 1800-200-8899</p>
                  </div>
                </div>

                <div className="contact-detail-row">
                  <span className="contact-icon-large">✉</span>
                  <div>
                    <strong>Email Inquiries</strong>
                    <p>support@hotelaggregatorsystem.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-actions-box">
              <h3 className="box-title">Ready to Book Your Next Stay?</h3>
              <p className="box-sub">Search available hotels or login to view your confirmed bookings.</p>
              <div className="box-buttons">
                <button
                  type="button"
                  onClick={(e) => handleProtectedAction(e, "/search-hotels")}
                  className="mmt-btn mmt-btn-primary"
                >
                  Search Available Hotels
                </button>
                <Link to="/register" className="mmt-btn mmt-btn-outline">
                  Create Free Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
