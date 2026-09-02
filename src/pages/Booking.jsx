import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../service/api";

function Booking() {

  const { roomId } = useParams();

  const navigate = useNavigate();

  const [guestName, setGuestName] =
    useState("");

  const [guestEmail, setGuestEmail] =
    useState("");

  const [checkInDate, setCheckInDate] =
    useState("");

  const [checkOutDate, setCheckOutDate] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [totalAmount, setTotalAmount] =
    useState(null);

  const [bookingAvailable, setBookingAvailable] =
    useState(false);

  const handleBooking = async () => {

    try {

      const response = await api.post(
        "/api/bookings",
        {
          roomId: Number(roomId),
          guestName,
          guestEmail,
          checkInDate,
          checkOutDate
        }
      );

      setMessage(
        response.data.message
      );

      setTotalAmount(
        response.data.totalAmount
      );

      setBookingAvailable(true);

    } catch (error) {

      console.log(error);

      console.log(error.response);

      console.log(error.response?.data);

      setMessage(
        error.response?.data?.message ||
        error.message ||
        "Something went wrong"
      );

      setBookingAvailable(false);
    }
  };

  return (
    <div>

      <h1>Book Room</h1>

      <label>
        Guest Name
      </label>

      <br />

      <input
        type="text"
        placeholder="Enter Guest Name"
        value={guestName}
        onChange={(e) =>
          setGuestName(e.target.value)
        }
      />

      <br /><br />

      <label>
        Guest Email
      </label>

      <br />

      <input
        type="email"
        placeholder="Enter Guest Email"
        value={guestEmail}
        onChange={(e) =>
          setGuestEmail(e.target.value)
        }
      />

      <br /><br />

      <label>
        Check In Date
      </label>

      <br />

      <input
        type="date"
        value={checkInDate}
        onChange={(e) =>
          setCheckInDate(e.target.value)
        }
      />

      <br /><br />

      <label>
        Check Out Date
      </label>

      <br />

      <input
        type="date"
        value={checkOutDate}
        onChange={(e) =>
          setCheckOutDate(e.target.value)
        }
      />

      <br /><br />

      <button onClick={handleBooking}>
        Check Availability
      </button>

      <br /><br />

      {
        message && (
          <p
            style={{
              color: "red",
              fontWeight: "bold"
            }}
          >
            {message}
          </p>
        )
      }

      {
        totalAmount && (
          <h2>
            Total Amount : ₹{totalAmount}
          </h2>
        )
      }

      {
        bookingAvailable && (

          
<button
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
  Confirm Booking
</button>
        )
      }

    </div>
  );
}

export default Booking;