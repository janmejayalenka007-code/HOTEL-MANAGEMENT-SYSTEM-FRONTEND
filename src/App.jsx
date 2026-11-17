import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

import SearchHotels from "./pages/SearchHotels";
import Rooms from "./pages/Rooms";
import Booking from "./pages/Booking";
import Payment from "./pages/Payment";
import MyBookings from "./pages/MyBookings";

// Global click interceptor: If the user is not logged in, clicking any button redirects to /login
function AuthButtonInterceptor({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleGlobalClick = (e) => {
      const button = e.target.closest("button");
      if (!button) return;

      const currentPath = location.pathname;

      // Allow form submission & interactions on login and register pages
      if (currentPath === "/login" || currentPath === "/register") {
        return;
      }

      // Allow navigation toggles like mobile hamburger menu
      if (
        button.classList.contains("navbar-hamburger") ||
        button.getAttribute("aria-label")?.includes("navigation")
      ) {
        return;
      }

      // Check if user is logged in
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      if (!isLoggedIn) {
        // Allow buttons directly wrapped in /login or /register links
        const parentLink = button.closest("a");
        if (parentLink) {
          const href = parentLink.getAttribute("href");
          if (href === "/login" || href === "/register") {
            return;
          }
        }

        e.preventDefault();
        e.stopPropagation();
        navigate("/login");
      }
    };

    // Use capture phase so unauthenticated button clicks are intercepted immediately
    document.addEventListener("click", handleGlobalClick, true);
    return () => {
      document.removeEventListener("click", handleGlobalClick, true);
    };
  }, [location.pathname, navigate]);

  return children;
}

// Protected route wrapper: prevents direct URL access to internal pages when not logged in
function ProtectedRoute({ element }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? element : <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <AuthButtonInterceptor>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/search-hotels"
            element={<ProtectedRoute element={<SearchHotels />} />}
          />

          <Route
            path="/rooms/:hotelId"
            element={<ProtectedRoute element={<Rooms />} />}
          />

          <Route
            path="/booking/:roomId"
            element={<ProtectedRoute element={<Booking />} />}
          />

          <Route
            path="/payment"
            element={<ProtectedRoute element={<Payment />} />}
          />

          <Route
            path="/my-bookings/:email"
            element={<ProtectedRoute element={<MyBookings />} />}
          />
        </Routes>
      </AuthButtonInterceptor>
    </BrowserRouter>
  );
}

export default App;
