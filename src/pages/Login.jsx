import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../service/api";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [isError, setIsError] =
    useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await api.post(
        "/api/users/login",
        {
          email,
          password
        }
      );

      setMessage(
        response.data.message
      );

      setIsError(false);

      setEmail("");
      setPassword("");

      setTimeout(() => {

        navigate(
          "/search-hotels"
        );

      }, 1500);

    } catch (error) {

      setMessage(
        error.response?.data?.message ||
        error.message ||
        "Login Failed"
      );

      setIsError(true);
    }
  };

  return (
    <div>

      <h1>Login</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <br /><br />

        <input
          type="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <br /><br />

        <button type="submit">
          Login
        </button>

      </form>

      <br />

      {
        message && (
          <p
            style={{
              color:
                isError
                  ? "red"
                  : "green",
              fontWeight:
                "bold"
            }}
          >
            {message}
          </p>
        )
      }

    </div>
  );
}

export default Login;