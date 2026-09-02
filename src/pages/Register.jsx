import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../service/api";

function Register() {

  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [isError, setIsError] =
    useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await api.post(
        "/api/users/register",
        {
          name,
          email,
          password,
          phone
        }
      );

      setMessage(
        response.data.message
      );

      setIsError(false);

      setName("");
      setEmail("");
      setPassword("");
      setPhone("");

      setTimeout(() => {

        navigate("/login");

      }, 1500);

    } catch (error) {

      setMessage(
        error.response?.data?.message ||
        error.message ||
        "Registration Failed"
      );

      setIsError(true);
    }
  };

  return (
    <div>

      <h1>Register</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Enter your Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)}
        />

        <br /><br />

        <input
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)}
        />

        <br /><br />

        <input
          type="text"
          placeholder="Enter your Phone Number"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)}
        />

        <br /><br />

        <button type="submit">
          Register
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

export default Register;