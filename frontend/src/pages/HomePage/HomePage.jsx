import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import icon from "../../assets/icon.jpg";
import car from "../../assets/car.png";
import frontvideo from "../../assets/frontvideo.mp4";
import { Link } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const [flipped, setFlipped] = useState(false);
  const [showRoles, setShowRoles] = useState(false);

  const handleRoleSelection = (role) => {
    navigate(`/${role}login`);
    setShowRoles(false);
  };

  const handleBookNow = () => {
    navigate("/userlogin");
  };

  const handleContactUs = () => {
    navigate("/contact-us");
  };

  return (
    <div className="homepage-container">
      {/* Header Section */}
      <header className="main-header">
        <div className="logo-container">
          <div
            className={`flip-container ${flipped ? "flipped" : ""}`}
            onClick={() => setFlipped(!flipped)}
          >
            <div className="flipper">
              <div className="front">
                <img
                  src={icon}
                  alt="RideInMotihari Logo"
                  className="logo-img"
                />
              </div>
              <div className="back">
                <img
                  src={icon}
                  alt="RideInMotihari Logo Back"
                  className="logo-img"
                />
              </div>
            </div>
          </div>

          <h2 className="company-name">RideInMotihari</h2>
          <img src={car} alt="Car Moving" className="moving-car" />
        </div>

        {/* Buttons Side by Side */}
        <div className="button-container">
          <div className="role-selector">
            <button
              onClick={() => setShowRoles(!showRoles)}
              className="role-button"
            >
              Login
              <span className={`dropdown-arrow ${showRoles ? "open" : ""}`}>
                ▼
              </span>
            </button>

            {showRoles && (
              <div className="role-dropdown">
                <button
                  onClick={() => handleRoleSelection("user")}
                  className="dropdown-item"
                >
                  User
                </button>
                <button
                  onClick={() => handleRoleSelection("serviceprovider")}
                  className="dropdown-item"
                >
                  Service Provider
                </button>
                <button
                  onClick={() => handleRoleSelection("admin")}
                  className="dropdown-item"
                >
                  Admin
                </button>
              </div>
            )}
          </div>

          <button
            onClick={handleContactUs}
            className="role-button"
            style={{ marginLeft: "10px" }}
          >
            Contact Us
          </button>
        </div>
      </header>

      {/* Video Background with Dashboard Overlay */}
      <div className="video-overlay-container">
        <video
          src={frontvideo}
          autoPlay
          muted
          loop
          playsInline
          className="hero-video"
        />

        <div className="welcome-dashboard">
          <div className="dashboard-content">
            <h2>Welcome to RideIn Motihari</h2>
            <p>Book your ride with just one click</p>
            <button onClick={handleBookNow} className="book-now-btn">
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="main-footer">
  <div className="footer-content">
    <div className="footer-section">
      <h4>Company</h4>
      <p>
        <Link to="/about-us">About us</Link>
      </p>
      <p>
        <Link to="/our-offerings">Our offerings</Link>
      </p>
      <p>
        <Link to="/careers">Careers</Link>
      </p>
    </div>
    <div className="footer-section">
      <h4>Products</h4>
      <p>
        <Link to="/bike">Bike</Link>
      </p>
      <p>
        <Link to="/auto">Auto</Link>
      </p>
      <p>
        <Link to="/car">Car (4 Seater)</Link>
      </p>
    </div>
    <div className="footer-section">
      <h4>Global</h4>
      <p>
        <Link to="/safety">Safety</Link>
      </p>
      <p>
        <Link to="/sustainability">Sustainability</Link>
      </p>
    </div>
    <div className="footer-section">
      <h4>Our Team</h4>
      <p>
        <Link to="/our-team">Meet Our Team</Link>
      </p>
    </div>
  </div>
  <div className="footer-bottom">
    <p>
      © {new Date().getFullYear()} RideInMotihari. All rights reserved.
    </p>
  </div>
</footer>

    </div>
  );
}

export default HomePage;
