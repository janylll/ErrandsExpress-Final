import React from 'react';
import Lnavbar from '../../components/landingcoms/Lnavbar';
import Lfooter from '../../components/landingcoms/Lfooter';
import './landingpage.css';

function LandingPage() {
  return (
    <div className="page-container">
      <Lnavbar />
      <section id="first-page" className="landing-content">
        <div className="landing-container">
          <h1 className="title1">
            <span>Errands</span><br />
            <span>Express</span>
          </h1>
          <p className="tagline">
            Your Quick Solution Errands <br /> Runner and Services
          </p>
        </div>
      </section>
      <Lfooter />
    </div>
  );
}

export default LandingPage;
