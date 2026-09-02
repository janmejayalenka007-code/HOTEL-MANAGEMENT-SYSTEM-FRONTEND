import { useState } from "react";
import {
  useLocation,
  useNavigate
} from "react-router-dom";
import api from "../service/api";

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

  const [paymentMethod, setPaymentMethod] =
    useState("PHONEPE");

  const [transactionId] =
    useState(`TXN${Date.now()}`);

  const [message, setMessage] =
    useState("");

  const handlePayment = async () => {

    try {

      const response = await api.post(
        "/api/payments",
        {
          roomId: Number(roomId),
          guestName,
          guestEmail,
          checkInDate,
          checkOutDate,
          amount,
          paymentMethod,
          transactionId
        }
      );

      setMessage(
        response.data.message
      );

      setTimeout(() => {

        navigate(
          `/my-bookings/${guestEmail}`
        );

      }, 1500);

    } catch (error) {

      console.log(error);

      console.log(error.response);

      console.log(error.response?.data);

      setMessage(
        error.response?.data?.message ||
        "Payment Failed"
      );
    }
  };

  return (
    <div>

      <h1>Payment</h1>

      <hr />

      <h3>Booking Details</h3>

      <p>
        Guest Name:
        {guestName}
      </p>

      <p>
        Guest Email:
        {guestEmail}
      </p>

      <p>
        Room Id:
        {roomId}
      </p>

      <p>
        Check In:
        {checkInDate}
      </p>

      <p>
        Check Out:
        {checkOutDate}
      </p>

      <h2>
        Total Amount :
        ₹{amount}
      </h2>

      <hr />

      <label>
        Payment Method
      </label>

      <br />

      <select
        value={paymentMethod}
        onChange={(e) =>
          setPaymentMethod(
            e.target.value
          )
        }
      >

        <option value="PHONEPE">
          PhonePe
        </option>

        <option value="GOOGLE_PAY">
          Google Pay
        </option>

        <option value="PAYTM">
          Paytm
        </option>

      </select>

      <br /><br />

      <label>
        Transaction Id
      </label>

      <br />

      <input
        type="text"
        value={transactionId}
        readOnly
      />

      <br /><br />

      <button
        onClick={handlePayment}
      >
        Pay Now
      </button>

      <br /><br />

      {
        message && (
          <h3
            style={{
              color:
                message.includes(
                  "successfully"
                )
                  ? "green"
                  : "red"
            }}
          >
            {message}
          </h3>
        )
      }

    </div>
  );
}

export default Payment;