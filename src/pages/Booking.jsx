import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../service/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/hotels.css";

function Booking() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [message, setMessage] = useState("");
  const [totalAmount, setTotalAmount] = useState(null);
  const [bookingAvailable, setBookingAvailable] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleBooking = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    if (!guestName || !guestEmail || !checkInDate || !checkOutDate) {
      setMessage("Please fill in all guest details and stay dates");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/api/bookings", {
        roomId: Number(roomId),
        guestName,
        guestEmail,
        checkInDate,
        checkOutDate
      });

      setMessage(response.data.message || "Room is available!");
      setTotalAmount(response.data.totalAmount);
      setBookingAvailable(true);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        error.message ||
        "Room is unavailable for selected dates or booking failed"
      );
      setBookingAvailable(false);
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
            onClick={() => navigate(-1)}
            className="mmt-btn mmt-btn-outline mmt-btn-sm"
            style={{ marginBottom: "16px", background: "rgba(255,255,255,0.1)", color: "#fff", borderColor: "rgba(255,255,255,0.3)" }}
          >
            ← Back to Rooms
          </button>
          <h1 className="search-header-title">Complete Your Hotel Booking</h1>
          <p className="search-header-sub">
            Review guest details, select check-in dates, and lock in guaranteed corporate rates
          </p>
        </div>
      </div>

      <main className="page-main-content">
        <div className="container">
          <div className="form-card-container">
            <div className="mmt-card" style={{ padding: "32px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <h2 style={{ fontSize: "22px", margin: 0 }}>Guest & Stay Details</h2>
                <span className="mmt-badge mmt-badge-blue">Room #{roomId}</span>
              </div>

              <form onSubmit={handleBooking}>
                <div className="mmt-form-group">
                  <label className="mmt-label">Primary Guest Full Name</label>
                  <input
                    className="mmt-input"
                    type="text"
                    placeholder="Enter full name as per Govt. ID"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    required
                  />
                </div>

                <div className="mmt-form-group">
                  <label className="mmt-label">Guest Email Address (For Booking Voucher)</label>
                  <input
                    className="mmt-input"
                    type="email"
                    placeholder="e.g. guest@corporate.com"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div className="mmt-form-group">
                    <label className="mmt-label">Check-in Date</label>
                    <input
                      className="mmt-input"
                      type="date"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mmt-form-group">
                    <label className="mmt-label">Check-out Date</label>
                    <input
                      className="mmt-input"
                      type="date"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mmt-btn mmt-btn-primary"
                  style={{ width: "100%", marginTop: "8px" }}
                  disabled={loading}
                >
                  {loading ? "Checking Availability..." : "Check Availability & Fare"}
                </button>
              </form>

              {message && (
                <div
                  className={`alert-box ${bookingAvailable ? "alert-success" : "alert-error"}`}
                  style={{ marginTop: "20px" }}
                >
                  <span>{bookingAvailable ? "✓" : "⚠️"}</span>
                  <span>{message}</span>
                </div>
              )}

              {totalAmount && (
                <div className="booking-summary-box">
                  <div>
                    <span style={{ fontSize: "12px", color: "var(--mmt-text-muted)", display: "block" }}>
                      TOTAL PAYABLE FARE (INCL. TAXES)
                    </span>
                    <span className="booking-summary-amount">₹{totalAmount}</span>
                  </div>

                  <span className="mmt-badge mmt-badge-green">
                    Corporate Discount Applied
                  </span>
                </div>
              )}

              {bookingAvailable && (
                <button
                  className="mmt-btn mmt-btn-primary"
                  style={{
                    width: "100%",
                    fontSize: "17px",
                    padding: "16px",
                    boxShadow: "0 6px 20px rgba(6, 90, 243, 0.4)"
                  }}
                  onClick={() =>
                    navigate("/payment", {
                      state: {
                        roomId,
                        guestName,
                        guestEmail,
                        checkInDate,
                        checkOutDate,
                        amount: totalAmount
                      }
                    })
                  }
                >
                  Confirm & Proceed to Payment →
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Booking;
