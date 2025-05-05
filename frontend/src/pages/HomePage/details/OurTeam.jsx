import React from 'react';
import '../details/OurTeam.css'; 
import sakshi from "../../../assets/sakshi.jpg";
import vicky from "../../../assets/vicky.jpg";
import sonali from "../../../assets/sonali.jpg";
import nishant from "../../../assets/nishant.jpg";
import vibhu from "../../../assets/vibhanshu.jpg";
import Header from './../../Login/Header';
function OurTeam() {
  return (
    <>
    <Header /> {/* ✅ Placed the header at the top */ }
    <div className="page-container">
      <h1>Our Team</h1>
      <div className="team-list">
        <div className="team-member">
          <img src={nishant} alt="Nishant Kumar" className="member-photo" />
          <h3>Nishant Kumar</h3>
          <p>UI/UX Designer & Project Leader</p>
        </div>
        <div className="team-member">
          <img src={sakshi} alt="Sakshi" className="member-photo" />
          <h3>Sakshi</h3>
          <p>Frontend Developer</p>
        </div>
        <div className="team-member">
          <img src={sonali} alt="Sonali" className="member-photo" />
          <h3>Sonali</h3>
          <p>Backend Developer</p>
        </div>
        <div className="team-member">
          <img src={vibhu} alt="Vibhanshu Kumar" className="member-photo" />
          <h3>Vibhanshu Kumar</h3>
          <p>Project Architect & Backend Lead</p>
        </div>
        <div className="team-member">
          <img src={vicky} alt="Vicky Kumar" className="member-photo" />
          <h3>Vicky Kumar</h3>
          <p>Frontend Developer</p>
        </div>
      </div>
    </div>
    </>
  );
}

export default OurTeam;