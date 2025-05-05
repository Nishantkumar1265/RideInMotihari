import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import icon from "../../assets/icon.jpg";
import car from "../../assets/car.png";
import "./Header.css";

function Header() {
  const [flipped, setFlipped] = useState(false);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    setFlipped(!flipped);      // Flip animation
    navigate("/");             // Redirect to homepage
  };

  return (
    <header className="main-header">
      <div className="logo-container" onClick={handleLogoClick} style={{ cursor: "pointer" }}>
        <div className={`flip-container ${flipped ? "flipped" : ""}`}>
          <div className="flipper">
            <div className="front">
              <img src={icon} alt="RideInMotihari Logo" className="logo-img" />
            </div>
            <div className="back">
              <img src={icon} alt="RideInMotihari Logo Back" className="logo-img" />
            </div>
          </div>
        </div>

        <h2 className="company-name">RideInMotihari</h2>
        <img src={car} alt="Car Moving" className="moving-car" />
      </div>
    </header>
  );
}

export default Header;
