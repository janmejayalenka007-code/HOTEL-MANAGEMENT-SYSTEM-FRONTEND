import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../service/api";

function Rooms() {

  const { hotelId } = useParams();

  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {

    fetchRooms();

  }, [hotelId]);

  const fetchRooms = async () => {

    try {

      const response = await api.get(
        `/api/rooms/hotel/${hotelId}`
      );

      setRooms(response.data);

      setMessage("");

    } catch (error) {

      setRooms([]);

      setMessage(
        error.response?.data?.message ||
        error.message ||
        "Failed to load rooms"
      );
    }
  };

  return (
    <div>

      <h1>Available Rooms</h1>

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
        rooms.map((room) => (

          <div
            key={room.id}
            style={{
              border: "1px solid black",
              padding: "10px",
              marginBottom: "10px"
            }}
          >

            <h2>
              Room Number: {room.roomNumber}
            </h2>

            <p>
              Room Type: {room.roomType}
            </p>

            <p>
              Price Per Night:
              ₹{room.pricePerNight}
            </p>

            <p>
              Capacity:
              {room.capacity}
            </p>

            <p>
              Description:
              {room.description}
            </p>

            <p>
              Available:
              {
                room.isAvailable
                  ? " Yes"
                  : " No"
              }
            </p>

            <button
              onClick={() =>
                navigate(
                  `/booking/${room.id}`
                )
              }
            >
              Book Now
            </button>

          </div>
        ))
      }

    </div>
  );
}

export default Rooms;