import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../service/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/hotels.css";

function MyBookings() {
  const { email } = useParams();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");
  const [cancelMessage, setCancelMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (email) {
      fetchBookings();
    } else {
      setLoading(false);
    }
  }, [email]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/api/bookings/customer/${email}`);
      setBookings(response.data);
      setMessage("");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "No bookings found for this email address"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    try {
      const preview = await api.post("/api/bookings/cancel-preview", {
        bookingId,
        reason: "Cancelled by customer"
      });

      const confirmCancel = window.confirm(
        preview.data.message || "Are you sure you want to cancel this booking?"
      );

      if (!confirmCancel) {
        return;
      }

      const response = await api.post("/api/bookings/cancel-confirm", {
        bookingId,
        reason: "Cancelled by customer"
      });

      setCancelMessage(response.data.message || "Booking cancelled successfully");
      fetchBookings();
    } catch (error) {
      setCancelMessage(
        error.response?.data?.message || "Cancellation failed. Please try again."
      );
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="search-page-header">
        <div className="search-header-container">
          <h1 className="search-header-title">My Bookings & Corporate Trips</h1>
          <p className="search-header-sub">
            Manage your hotel reservations, download invoices, and track stay status
          </p>
          {email && (
            <span className="mmt-badge mmt-badge-blue" style={{ fontSize: "13px", padding: "6px 14px" }}>
              👤 Account: {email}
            </span>
          )}
        </div>
      </div>

      <main className="page-main-content">
        <div className="container">
          {cancelMessage && (
            <div className="alert-box alert-error">
              <span>ℹ️</span>
              <span>{cancelMessage}</span>
            </div>
          )}

          {message && (
            <div className="alert-box alert-error">
              <span>⚠️</span>
              <span>{message}</span>
            </div>
          )}

          {loading ? (
            <div className="empty-state-box">
              <div className="empty-state-icon">⏳</div>
              <h3 className="empty-state-title">Loading Your Bookings...</h3>
            </div>
          ) : (
            <div className="bookings-list">
              {bookings.map((booking) => (
                <div key={booking.bookingId} className="booking-item-card">
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                      <h3 style={{ fontSize: "20px", margin: 0, color: "var(--mmt-navy-dark)" }}>
                        {booking.hotelName}
                      </h3>
                      <span
                        className={`booking-status-pill ${
                          booking.bookingStatus === "CANCELLED"
                            ? "booking-status-cancelled"
                            : "booking-status-confirmed"
                        }`}
                      >
                        {booking.bookingStatus}
                      </span>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "10px", marginTop: "12px", fontSize: "14px" }}>
                      <div>
                        <span style={{ color: "var(--mmt-text-light)", fontSize: "12px", display: "block" }}>BOOKING ID</span>
                        <strong>#{booking.bookingId}</strong>
                      </div>

                      <div>
                        <span style={{ color: "var(--mmt-text-light)", fontSize: "12px", display: "block" }}>ROOM NUMBER</span>
                        <strong>Room {booking.roomNumber}</strong>
                      </div>

                      <div>
                        <span style={{ color: "var(--mmt-text-light)", fontSize: "12px", display: "block" }}>CHECK-IN</span>
                        <strong>{booking.checkInDate}</strong>
                      </div>

                      <div>
                        <span style={{ color: "var(--mmt-text-light)", fontSize: "12px", display: "block" }}>CHECK-OUT</span>
                        <strong>{booking.checkOutDate}</strong>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "12px" }}>
                    <div>
                      <span style={{ fontSize: "12px", color: "var(--mmt-text-light)", display: "block", textAlign: "right" }}>PAID AMOUNT</span>
                      <span style={{ fontSize: "24px", fontWeight: "800", color: "var(--mmt-navy-dark)" }}>
                        ₹{booking.totalAmount}
                      </span>
                    </div>

                    {booking.bookingStatus !== "CANCELLED" && (
                      <button
                        className="mmt-btn mmt-btn-danger mmt-btn-sm"
                        onClick={() => handleCancel(booking.bookingId)}
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {bookings.length === 0 && !loading && (
                <div className="empty-state-box">
                  <div className="empty-state-icon">📋</div>
                  <h3 className="empty-state-title">No Bookings Found</h3>
                  <p className="empty-state-sub">
                    You don't have any reservations under this account yet. Ready to plan your next stay?
                  </p>
                  <button
                    onClick={() => navigate("/search-hotels")}
                    className="mmt-btn mmt-btn-primary"
                  >
                    Search Hotels
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default MyBookings;
