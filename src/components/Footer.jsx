import { Link } from "react-router-dom";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer-wrapper">
      <div className="footer-top">
        <div className="footer-container">
          <div className="footer-brand-col">
            <div className="footer-brand">
              <span className="footer-logo-icon">🏨</span>
              <span className="footer-brand-title">HOTEL AGGREGATOR SYSTEM</span>
            </div>
            <p className="footer-tagline">
              India's premier hotel aggregation & corporate travel booking portal.
              Discover thousands of luxury and business hotels with assured corporate rates.
            </p>
            <div className="footer-badges">
              <span className="footer-badge">✓ GST Assured</span>
              <span className="footer-badge">✓ 24x7 Concierge</span>
              <span className="footer-badge">✓ Instant Confirmation</span>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/search-hotels">Search Hotels</Link></li>
              <li><Link to="/search-hotels">Corporate Stays</Link></li>
              <li><Link to="/register">Sign up Company</Link></li>
              <li><Link to="/login">Corporate Login</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Top Destinations</h4>
            <ul className="footer-links">
              <li><Link to="/search-hotels">Hotels in Bhubaneswar</Link></li>
              <li><Link to="/search-hotels">Hotels in Delhi NCR</Link></li>
              <li><Link to="/search-hotels">Hotels in Bengaluru</Link></li>
              <li><Link to="/search-hotels">Hotels in Hyderabad</Link></li>
              <li><Link to="/search-hotels">Hotels in Goa</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Contact & Support</h4>
            <p className="footer-contact-item">
              <span className="contact-icon">📞</span>
              <span>1800-200-8899 (Toll Free)</span>
            </p>
            <p className="footer-contact-item">
              <span className="contact-icon">✉</span>
              <span>support@hotelaggregatorsystem.com</span>
            </p>
            <p className="footer-contact-item">
              <span>Nalanda Institute of Technology(NIT), Bhubaneswar</span>
            </p>
            <div className="payment-security-note">
              🔒 256-Bit SSL Encrypted & PCI-DSS Compliant
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-container bottom-flex">
          <p>© 2026 Hotel Aggregator System. All rights reserved.</p>
          <div className="footer-legal-links">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span>Cancellation Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
