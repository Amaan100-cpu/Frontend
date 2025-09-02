import "./Footer.css"
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBag,
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faPinterest,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Footer Top */}
        <div className="footer-top">
          {/* Shop Column */}
          <div className="footer-column">
            <h4>Shop</h4>
            <ul>
              <li>
                <a href="#">
                  <FontAwesomeIcon icon={faChevronRight} className="footer-icon" />
                  Men's Fashion
                </a>
              </li>
              <li>
                <a href="#">
                  <FontAwesomeIcon icon={faChevronRight} className="footer-icon" />
                  Women's Fashion
                </a>
              </li>
              <li>
                <a href="#">
                  <FontAwesomeIcon icon={faChevronRight} className="footer-icon" />
                  Boy's Fashion
                </a>
              </li>
              <li>
                <a href="#">
                  <FontAwesomeIcon icon={faChevronRight} className="footer-icon" />
                  Girl's Fashion
                </a>
              </li>
              <li>
                <a href="#">
                  <FontAwesomeIcon icon={faChevronRight} className="footer-icon" />
                  Babies
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service Column */}
          <div className="footer-column">
            <h4>Customer Service</h4>
            <ul>
              <li>
                <a href="/about">
                  <FontAwesomeIcon icon={faChevronRight} className="footer-icon" />
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/about">
                  <FontAwesomeIcon icon={faChevronRight} className="footer-icon" />
                  FAQs
                </a>
              </li>
              <li>
                <a href="/about">
                  <FontAwesomeIcon icon={faChevronRight} className="footer-icon" />
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="/about">
                  <FontAwesomeIcon icon={faChevronRight} className="footer-icon" />
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a href="/about">
                  <FontAwesomeIcon icon={faChevronRight} className="footer-icon" />
                  Track Order
                </a>
              </li>
            </ul>
          </div>

          {/* About Us Column */}
          <div className="footer-column">
            <h4>About Us</h4>
            <ul>
              <li>
                <a href="/about">
                  <FontAwesomeIcon icon={faChevronRight} className="footer-icon" />
                  Our Story
                </a>
              </li>
              <li>
                <a href="/about">
                  <FontAwesomeIcon icon={faChevronRight} className="footer-icon" />
                  Careers
                </a>
              </li>
              <li>
                <a href="/about">
                  <FontAwesomeIcon icon={faChevronRight} className="footer-icon" />
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="/about">
                  <FontAwesomeIcon icon={faChevronRight} className="footer-icon" />
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/about">
                  <FontAwesomeIcon icon={faChevronRight} className="footer-icon" />
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Connect With Us Column */}
          <div className="footer-column">
            <h4>Connect With Us</h4>
            <div className="social-links">
              <a href="#">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#">
                <FontAwesomeIcon icon={faPinterest} />
              </a>
              <a href="#">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </div>
            <div className="contact-info">
              <a href="#">
                <FontAwesomeIcon icon={faPhone} />
                +91 9456844856
              </a>
              <a href="#">
                <FontAwesomeIcon icon={faEnvelope} />
                amaanahmad8616@gmail.com
              </a>
              <a href="#">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                Karula, Moradabad, Uttar Pradesh
              </a>
            </div>
          </div>
        </div>

        {/* Footer Middle */}
        <div className="footer-middle">
          <div className="footer-logo">
            <FontAwesomeIcon icon={faShoppingBag} />
            <span>Amacloth</span>
          </div>
          <div className="payment-methods">
            <div className="payment-method">
              <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="Visa" />
            </div>
            <div className="payment-method">
              <img src="https://cdn-icons-png.flaticon.com/512/196/196561.png" alt="Mastercard" />
            </div>
            <div className="payment-method">
              <img src="https://cdn-icons-png.flaticon.com/512/196/196566.png" alt="American Express" />
            </div>
            <div className="payment-method">
              <img src="https://cdn-icons-png.flaticon.com/512/825/825454.png" alt="PayPal" />
            </div>
            <div className="payment-method">
              <img src="https://cdn-icons-png.flaticon.com/512/825/825465.png" alt="Apple Pay" />
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">Sitemap</a>
          </div>
          <div className="copyright">
            © {new Date().getFullYear()} Amacloth. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;