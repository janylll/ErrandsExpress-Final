import React from 'react';
import Lnavbar from '../../components/landingcoms/Lnavbar';
import Lfooter from '../../components/landingcoms/Lfooter';
import './contactPage.css';
import profile from '../../assets/download.jpeg';

function ContactPage() {
  return (
    <div className="contact-page-wrapper">
      <Lnavbar />
      <section id="contact">
        <div className="card-alignment">
          <div className="card fade-in" id="janyl">
            <img className="card-image" src={profile} alt="Janyl Estores" />
            <h2 className="card-name">Janyl Sweet Estores</h2>
            <p className="card-mail">janylsweetv.estores@gmail.com</p>
            <p className="card-phone">09123456789</p>
            <span className="role-tag">UI Designer</span>
          </div>
          <div className="card fade-in" id="Marc">
            <img className="card-image" src={profile} alt="Marc Ariel H. Eurese" />
            <h2 className="card-name">Marc Ariel H. Eurese</h2>
            <p className="card-mail">blank@gmail.com</p>
            <p className="card-phone">09123456789</p>
            <span className="role-tag">Back-End Dev</span>
          </div>
          <div className="card fade-in" id="Dieter">
            <img className="card-image" src={profile} alt="Dieter Macarayan" />
            <h2 className="card-name">Dieter Macarayan</h2>
            <p className="card-mail">blank@gmail.com</p>
            <p className="card-phone">09123456789</p>
            <span className="role-tag">Project Lead</span>
          </div>
        </div>
      </section>
      <Lfooter />
    </div>
  );
}

export default ContactPage;
