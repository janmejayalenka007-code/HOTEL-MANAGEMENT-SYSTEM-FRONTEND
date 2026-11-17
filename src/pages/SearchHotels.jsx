import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../service/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/hotels.css";

function SearchHotels() {
  const [city, setCity] = useState("");
  const [hotels, setHotels] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSearch = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    if (!city.trim()) {
      setMessage("Please enter a city name to search");
      setHotels([]);
      return;
    }

    setLoading(true);
    try {
      const response = await api.get(`/api/hotels/city/${city.trim()}`);
      setHotels(response.data);
      setMessage("");
    } catch (error) {
      setHotels([]);
      setMessage(
        error.response?.data?.message || "No hotels found in this city"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleViewAll = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/hotels");
      setHotels(response.data);
      setMessage("");
    } catch (error) {
      setHotels([]);
      setMessage(
        error.response?.data?.message ||
        error.message ||
        "Failed to load hotels"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="search-page-header">
        <div className="search-header-container">
          <h1 className="search-header-title">Search Hotels Across India</h1>
          <p className="search-header-sub">
            Book verified corporate and luxury stays with exclusive rates & instant confirmation
          </p>

          <form onSubmit={handleSearch} className="search-control-bar">
            <div className="search-input-field">
              <span>📍</span>
              <input
                type="text"
                placeholder="Enter City Name (e.g. Bhubaneswar, Delhi, Bengaluru, Goa)..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="search-btn-group">
              <button type="submit" className="mmt-btn mmt-btn-primary" disabled={loading}>
                {loading ? "Searching..." : "Search"}
              </button>
              <button
                type="button"
                onClick={handleViewAll}
                className="mmt-btn mmt-btn-outline"
                disabled={loading}
              >
                View All Hotels
              </button>
            </div>
          </form>
        </div>
      </div>

      <main className="page-main-content">
        <div className="container">
          {message && (
            <div className="alert-box alert-error">
              <span>⚠️</span>
              <span>{message}</span>
            </div>
          )}

          {hotels.length > 0 && (
            <div className="results-summary-bar">
              <span className="results-count">
                Showing {hotels.length} Verified {hotels.length === 1 ? "Hotel" : "Hotels"}
              </span>
              <span className="mmt-badge mmt-badge-green">
                ✓ Best Corporate Rates Guaranteed
              </span>
            </div>
          )}

          <div className="hotels-list">
            {hotels.map((hotel) => (
              <div
                key={hotel.id}
                className="hotel-card"
                onClick={() => navigate(`/rooms/${hotel.id}`)}
                style={{ cursor: "pointer" }}
              >
                <div className="hotel-image-mock">
                  <span className="hotel-assured-tag">myBiz Assured</span>
                  <span className="hotel-mock-icon">🏨</span>
                  <span style={{ fontSize: "12px", opacity: 0.9 }}>Aggregator Partner</span>
                </div>

                <div className="hotel-details">
                  <div className="hotel-title-row">
                    <h2 className="hotel-name">{hotel.hotelName}</h2>
                    <span className="hotel-rating-badge">4.5 ★</span>
                  </div>

                  <p className="hotel-location-text">
                    <span>📍</span>
                    <span>{hotel.address}, {hotel.city}, {hotel.state}</span>
                  </p>

                  <p className="hotel-desc">{hotel.description}</p>

                  <div className="hotel-perks-row">
                    <span className="mmt-badge mmt-badge-blue">Free Wi-Fi</span>
                    <span className="mmt-badge mmt-badge-blue">Air Conditioned</span>
                    <span className="mmt-badge mmt-badge-green">Free Cancellation</span>
                    <span className="mmt-badge mmt-badge-gold">GST Invoice Assured</span>
                  </div>

                  <p className="hotel-contact-text">
                    <strong>Contact Desk:</strong> {hotel.contactNumber}
                  </p>
                </div>

                <div className="hotel-price-col">
                  <span className="hotel-rate-caption">Corporate Rate</span>
                  <span className="hotel-corporate-note">Exclusive Member Pricing</span>
                  <button
                    className="mmt-btn mmt-btn-primary mmt-btn-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/rooms/${hotel.id}`);
                    }}
                  >
                    View Rooms →
                  </button>
                </div>
              </div>
            ))}

            {hotels.length === 0 && !message && (
              <div className="empty-state-box">
                <div className="empty-state-icon">🏨</div>
                <h3 className="empty-state-title">Find Your Perfect Stay</h3>
                <p className="empty-state-sub">
                  Enter any city name above or click "View All Hotels" to browse partner properties across India.
                </p>
                <button
                  type="button"
                  onClick={handleViewAll}
                  className="mmt-btn mmt-btn-primary"
                >
                  Browse All Hotels
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default SearchHotels;
