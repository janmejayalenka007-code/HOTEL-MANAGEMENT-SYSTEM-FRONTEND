import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../service/api";

function SearchHotels() {

  const [city, setCity] = useState("");
  const [hotels, setHotels] = useState([]);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSearch = async () => {

    if (!city.trim()) {

      setMessage("City name is required");
      setHotels([]);

      return;
    }

    try {

      const response = await api.get(
        `/api/hotels/city/${city}`
      );

      setHotels(response.data);
      setMessage("");

    } catch (error) {

      setHotels([]);

      setMessage(
        error.response?.data?.message ||
        "Something went wrong"
      );
    }
  };


 const handleViewAll = async () => {

  try {

    const response = await api.get(
      "/api/hotels"
    );

    setHotels(response.data);
    setMessage("");

  } catch (error) {

    setHotels([]);

    setMessage(
      error.response?.data?.message ||
      error.message ||
      "Something went wrong"
    );
  }
};

  

  return (
    <div>

      <h1>Search Hotels</h1>

      <input
        type="text"
        placeholder="Enter City"
        value={city}
        onChange={(e) =>
          setCity(e.target.value)}
      />

      <button onClick={handleSearch}>
        Search
      </button>

      <button onClick={handleViewAll}>
        View All Hotels
      </button>

      <br /><br />

      {message && (
        <p
          style={{
            color: "red",
            fontWeight: "bold"
          }}
        >
          {message}
        </p>
      )}

      <hr />

      {hotels.map((hotel) => (

        <div
          key={hotel.id}
          onClick={() =>
            navigate(`/rooms/${hotel.id}`)
          }
          style={{
            border: "1px solid black",
            padding: "10px",
            marginBottom: "10px",
            cursor: "pointer"
          }}
        >

          <h2>{hotel.hotelName}</h2>

          <p>City: {hotel.city}</p>

          <p>State: {hotel.state}</p>

          <p>Address: {hotel.address}</p>

          <p>Description: {hotel.description}</p>

          <p>Contact: {hotel.contactNumber}</p>

        </div>

      ))}

    </div>
  );
}

export default SearchHotels;