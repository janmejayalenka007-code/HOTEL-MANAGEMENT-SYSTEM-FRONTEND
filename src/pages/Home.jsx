import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {

  return (

    <div>

      <Navbar />

      {/* Hero Section */}

      <section>

        <h1>
          WELCOME TO
        </h1>

        <h1>
          HOTEL PUSPA
        </h1>

        <p>
          Find Hotels Across India
        </p>

        <p>
          Luxury Stay • Premium Experience
        </p>

        <br />

        <Link to="/register">

          <button>
            Register
          </button>

        </Link>

        {"  "}

        <Link to="/login">

          <button>
            Login
          </button>

        </Link>

      </section>

      <hr />

      {/* About Section */}

      <section>

        <h2>
          About Hotel Puspa
        </h2>

        <p>

          Hotel Puspa provides premium
          accommodation, luxury rooms,
          secure online booking and
          excellent customer service.

        </p>

        <p>

          Our mission is to provide
          affordable luxury and a
          comfortable stay experience
          for every guest.

        </p>

      </section>

      <hr />

      {/* Services */}

      <section>

        <h2>
          Our Services
        </h2>

        <ul>

          <li>
            Luxury Rooms
          </li>

          <li>
            Online Booking
          </li>

          <li>
            Secure Payment
          </li>

          <li>
            Easy Cancellation
          </li>

          <li>
            24x7 Support
          </li>

        </ul>

      </section>

      <hr />

      {/* Contact */}

      <section id="contact">

        <h2>
          Contact Us
        </h2>

        <p>
          📞 Support Available 24x7
        </p>

        <p>
          ✉ support@hotelpuspa.com
        </p>

      </section>

      <Footer />

    </div>

  );
}

export default Home;