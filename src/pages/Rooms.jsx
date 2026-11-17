import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../service/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/hotels.css";

function Rooms() {
  const { hotelId } = useParams();
  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRooms();
  }, [hotelId]);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/api/rooms/hotel/${hotelId}`);
      setRooms(response.data);
      setMessage("");
    } catch (error) {
      setRooms([]);
      setMessage(
        error.response?.data?.message ||
        error.message ||
        "Failed to load rooms for this hotel"
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
          <button
            onClick={() => navigate("/search-hotels")}
            className="mmt-btn mmt-btn-outline mmt-btn-sm"
            style={{ marginBottom: "16px", background: "rgba(255,255,255,0.1)", color: "#fff", borderColor: "rgba(255,255,255,0.3)" }}
          >
            ← Back to Hotels
          </button>
          <h1 className="search-header-title">Select Your Room</h1>
          <p className="search-header-sub">
            Choose from premium rooms and executive suites with corporate perks and amenities
          </p>
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

          {loading ? (
            <div className="empty-state-box">
              <div className="empty-state-icon">⏳</div>
              <h3 className="empty-state-title">Loading Available Rooms...</h3>
            </div>
          ) : (
            <>
              <div className="results-summary-bar">
                <span className="results-count">
                  {rooms.length} {rooms.length === 1 ? "Room Type Available" : "Room Types Available"}
                </span>
                <span className="mmt-badge mmt-badge-green">
                  ✓ Free Cancellation Available
                </span>
              </div>

              <div className="rooms-grid">
                {rooms.map((room) => (
                  <div key={room.id} className="room-card">
                    <div className="room-card-header">
                      <span className="room-type-badge">
                        {room.roomType || "Standard Room"}
                      </span>
                      <h3 className="room-number-title">
                        Room {room.roomNumber}
                      </h3>
                    </div>

                    <div className="room-card-body">
                      <div className="room-spec-row">
                        <span className="room-spec-label">Capacity</span>
                        <span className="room-spec-value">👥 {room.capacity} Guests</span>
                      </div>

                      <div className="room-spec-row">
                        <span className="room-spec-label">Status</span>
                        <span className="room-spec-value">
                          {room.isAvailable ? (
                            <span className="mmt-badge mmt-badge-green">Available</span>
                          ) : (
                            <span className="mmt-badge mmt-badge-red">Booked</span>
                          )}
                        </span>
                      </div>

                      <p className="room-desc">
                        {room.description || "Comfortable air-conditioned room with premium bedding, ensuite bathroom, and high-speed Wi-Fi."}
                      </p>

                      <div className="hotel-perks-row" style={{ marginTop: "auto" }}>
                        <span className="mmt-badge mmt-badge-blue">Complimentary Breakfast</span>
                        <span className="mmt-badge mmt-badge-blue">Free Wi-Fi</span>
                      </div>
                    </div>

                    <div className="room-card-footer">
                      <div>
                        <div className="room-price-val">₹{room.pricePerNight}</div>
                        <div className="room-price-sub">per room / night</div>
                      </div>

                      <button
                        className="mmt-btn mmt-btn-primary"
                        onClick={() => navigate(`/booking/${room.id}`)}
                        disabled={!room.isAvailable}
                        style={{
                          opacity: room.isAvailable ? 1 : 0.6,
                          cursor: room.isAvailable ? "pointer" : "not-allowed"
                        }}
                      >
                        {room.isAvailable ? "Book Now" : "Sold Out"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {rooms.length === 0 && !message && (
                <div className="empty-state-box">
                  <div className="empty-state-icon">🛏️</div>
                  <h3 className="empty-state-title">No Rooms Available</h3>
                  <p className="empty-state-sub">
                    There are currently no rooms listed for this hotel. Please try searching another property.
                  </p>
                  <button
                    onClick={() => navigate("/search-hotels")}
                    className="mmt-btn mmt-btn-primary"
                  >
                    Search Other Hotels
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Rooms;
