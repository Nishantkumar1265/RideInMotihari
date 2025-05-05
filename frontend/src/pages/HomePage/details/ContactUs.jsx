import React from "react";
import "../details/ContactUs.css";
import Header from '../../Login/Header'; // ✅ Already imported

function ContactUs() {
  return (
    <>
    <Header /> {/* ✅ Placed the header at the top */ }
    <div className="page-container">
      <h1>Contact Our Team</h1>
      <p>If you’d like to get in touch, please reach out to any of our team members below.</p>

      <div className="team-list">
        <div className="team-member">
          <h3>Nishant Kumar</h3>
          <p>Email: kumarnishant1265@gmail.com
          Phone: +91-7061537909</p>
        </div>
        <div className="team-member">
          <h3>Sakshi</h3>
          <p>Email: raisakshi064@gmail.com
          Phone: +91-7754996776</p>
         
        </div>
        <div className="team-member">
          <h3>Sonali</h3>
          <p>Email: sonali705066@gmail.com
          Phone: +91-7050667566</p>
          
        </div>
        <div className="team-member">
          <h3>Vibhanshu Kumar</h3>
          <p>Email: kumarvibhanshu84@gmail.com
          Phone: +91-7970897313</p>
        </div>
        <div className="team-member">
          <h3>Vicky</h3>
          <p>Email: vickyk33229@gmail.com
          Phone: +91-9142912271</p>
        </div>
      </div>
    </div>
    </>
  );
}

export default ContactUs;
