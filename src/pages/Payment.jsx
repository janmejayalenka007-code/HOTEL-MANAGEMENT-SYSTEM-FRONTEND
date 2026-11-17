import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../service/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/hotels.css";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    roomId,
    guestName,
    guestEmail,
    checkInDate,
    checkOutDate,
    amount
  } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState("PHONEPE");
  const [transactionId] = useState(`TXN${Date.now()}`);
  const [message, setMessage] = useState("");
  const [processing, setProcessing] = useState(false);

  const handlePayment = async () => {
    if (!amount) {
      setMessage("Invalid booking amount. Please re-initiate booking.");
      return;
    }

    setProcessing(true);
    try {
      const response = await api.post("/api/payments", {
        roomId: Number(roomId),
        guestName,
        guestEmail,
        checkInDate,
        checkOutDate,
        amount,
        paymentMethod,
        transactionId
      });

      setMessage(response.data.message || "Payment processed successfully!");

      setTimeout(() => {
        navigate(`/my-bookings/${guestEmail}`);
      }, 1500);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Payment Failed. Please try another payment mode."
      );
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="search-page-header">
        <div className="search-header-container">
          <h1 className="search-header-title">Secure Payment Gateway</h1>
          <p className="search-header-sub">
            🔒 256-Bit SSL Encrypted • 100% Safe & PCI-DSS Verified Transaction
          </p>
        </div>
      </div>

      <main className="page-main-content">
        <div className="container">
          <div className="form-card-container">
            <div className="mmt-card" style={{ padding: "32px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h2 style={{ fontSize: "22px", margin: 0 }}>Review & Pay</h2>
                <span className="mmt-badge mmt-badge-green">Instant Voucher</span>
              </div>

              {/* Booking Summary Box */}
              <div style={{
                background: "#f8fafc",
                border: "1px solid var(--mmt-border)",
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "24px"
              }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", fontSize: "14px" }}>
                  <div>
                    <span style={{ color: "var(--mmt-text-muted)", display: "block", fontSize: "12px" }}>GUEST NAME</span>
                    <strong>{guestName || "N/A"}</strong>
                  </div>
                  <div>
                    <span style={{ color: "var(--mmt-text-muted)", display: "block", fontSize: "12px" }}>EMAIL</span>
                    <strong>{guestEmail || "N/A"}</strong>
                  </div>
                  <div>
                    <span style={{ color: "var(--mmt-text-muted)", display: "block", fontSize: "12px" }}>CHECK-IN</span>
                    <strong>{checkInDate || "N/A"}</strong>
                  </div>
                  <div>
                    <span style={{ color: "var(--mmt-text-muted)", display: "block", fontSize: "12px" }}>CHECK-OUT</span>
                    <strong>{checkOutDate || "N/A"}</strong>
                  </div>
                </div>

                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "16px",
                  paddingTop: "14px",
                  borderTop: "1px solid var(--mmt-border)"
                }}>
                  <span style={{ fontSize: "15px", fontWeight: "600" }}>Total Amount to Pay</span>
                  <span style={{ fontSize: "26px", fontWeight: "800", color: "var(--mmt-blue-dark)" }}>
                    ₹{amount || 0}
                  </span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mmt-form-group">
                <label className="mmt-label">Select Payment Method</label>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "8px" }}>
                  <label style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "14px",
                    borderRadius: "10px",
                    border: paymentMethod === "PHONEPE" ? "2px solid var(--mmt-blue)" : "1px solid var(--mmt-border)",
                    background: paymentMethod === "PHONEPE" ? "var(--mmt-blue-light)" : "#fff",
                    cursor: "pointer",
                    fontWeight: "600"
                  }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="PHONEPE"
                      checked={paymentMethod === "PHONEPE"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span>🟣 PhonePe UPI / QR</span>
                  </label>

                  <label style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "14px",
                    borderRadius: "10px",
                    border: paymentMethod === "GOOGLE_PAY" ? "2px solid var(--mmt-blue)" : "1px solid var(--mmt-border)",
                    background: paymentMethod === "GOOGLE_PAY" ? "var(--mmt-blue-light)" : "#fff",
                    cursor: "pointer",
                    fontWeight: "600"
                  }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="GOOGLE_PAY"
                      checked={paymentMethod === "GOOGLE_PAY"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span>🔵 Google Pay UPI</span>
                  </label>

                  <label style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "14px",
                    borderRadius: "10px",
                    border: paymentMethod === "PAYTM" ? "2px solid var(--mmt-blue)" : "1px solid var(--mmt-border)",
                    background: paymentMethod === "PAYTM" ? "var(--mmt-blue-light)" : "#fff",
                    cursor: "pointer",
                    fontWeight: "600"
                  }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="PAYTM"
                      checked={paymentMethod === "PAYTM"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span>🔷 Paytm Wallet / UPI</span>
                  </label>
                </div>
              </div>

              <div className="mmt-form-group">
                <label className="mmt-label">Transaction Reference ID</label>
                <input
                  className="mmt-input"
                  type="text"
                  value={transactionId}
                  readOnly
                  style={{ background: "#f8fafc", color: "var(--mmt-text-muted)" }}
                />
              </div>

              <button
                className="mmt-btn mmt-btn-primary"
                style={{ width: "100%", padding: "16px", fontSize: "17px", marginTop: "12px" }}
                onClick={handlePayment}
                disabled={processing || !amount}
              >
                {processing ? "Authorizing Payment..." : `Pay ₹${amount || 0} Securely →`}
              </button>

              {message && (
                <div
                  className={`alert-box ${message.toLowerCase().includes("success") ? "alert-success" : "alert-error"}`}
                  style={{ marginTop: "20px" }}
                >
                  <span>{message.toLowerCase().includes("success") ? "✓" : "⚠️"}</span>
                  <span>{message}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Payment;
