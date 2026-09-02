import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../service/api";

function MyBookings() {

  const { email } = useParams();

  const [bookings, setBookings] =
    useState([]);

  const [message, setMessage] =
    useState("");

  const [cancelMessage, setCancelMessage] =
    useState("");

  useEffect(() => {

    fetchBookings();

  }, []);

  const fetchBookings = async () => {

    try {

      const response =
        await api.get(
          `/api/bookings/customer/${email}`
        );

      setBookings(
        response.data
      );

    } catch (error) {

      setMessage(
        error.response?.data?.message ||
        "No bookings found"
      );
    }
  };

  const handleCancel = async (
    bookingId
  ) => {

    try {

      const preview =
        await api.post(
          "/api/bookings/cancel-preview",
          {
            bookingId,
            reason:
              "Cancelled by customer"
          }
        );

      const confirmCancel =
        window.confirm(
          preview.data.message
        );

      if (!confirmCancel) {
        return;
      }

      const response =
        await api.post(
          "/api/bookings/cancel-confirm",
          {
            bookingId,
            reason:
              "Cancelled by customer"
          }
        );

      setCancelMessage(
        response.data.message
      );

      fetchBookings();

    } catch (error) {

      setCancelMessage(
        error.response?.data?.message ||
        "Cancellation Failed"
      );
    }
  };

  return (
    <div>

      <h1>My Bookings</h1>

      {
        cancelMessage && (

          <p
            style={{
              color: "red",
              fontWeight: "bold"
            }}
          >
            {cancelMessage}
          </p>

        )
      }

      {
        message && (
          <p>{message}</p>
        )
      }

      {
        bookings.map(
          (booking) => (

            <div
              key={booking.bookingId}
              style={{
                border:
                  "1px solid black",
                padding: "10px",
                marginBottom: "10px"
              }}
            >

              <h3>
                {booking.hotelName}
              </h3>

              <p>
                Booking Id:
                {booking.bookingId}
              </p>

              <p>
                Room:
                {booking.roomNumber}
              </p>

              <p>
                Check In:
                {booking.checkInDate}
              </p>

              <p>
                Check Out:
                {booking.checkOutDate}
              </p>

              <p>
                Amount:
                ₹{booking.totalAmount}
              </p>

              <p>
                Status:
                {booking.bookingStatus}
              </p>

              {
                booking.bookingStatus !==
                "CANCELLED" && (

                  <button
                    onClick={() =>
                      handleCancel(
                        booking.bookingId
                      )
                    }
                  >
                    Cancel Booking
                  </button>

                )
              }

            </div>
          )
        )
      }

    </div>
  );
}

export default MyBookings;