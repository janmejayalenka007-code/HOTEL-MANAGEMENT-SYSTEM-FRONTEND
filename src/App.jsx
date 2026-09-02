import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

import SearchHotels from "./pages/SearchHotels";
import Rooms from "./pages/Rooms";
import Booking from "./pages/Booking";
import Payment from "./pages/Payment";
import MyBookings from "./pages/MyBookings";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/search-hotels"
          element={<SearchHotels />}
        />

        <Route
          path="/rooms/:hotelId"
          element={<Rooms />}
        />

        <Route
          path="/booking/:roomId"
          element={<Booking />}
        />

        <Route
          path="/payment"
          element={<Payment />}
        />

        <Route
          path="/my-bookings/:email"
          element={<MyBookings />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;

