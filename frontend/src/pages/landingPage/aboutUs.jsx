import React from 'react';
import Lnavbar from '../../components/landingcoms/Lnavbar';
import Lfooter from '../../components/landingcoms/Lfooter';
import './aboutUs.css';

function AboutUs() {
  return (
    <div className="page-container">
      <Lnavbar />
      <section id="about" className="content">
        <div>
          <p className="description">
            Errands Express connects users with reliable errand runners to handle tasks quickly and efficiently within the campus. Whether it’s instructors needing to deliver documents or students requesting favors like food, drinks, or essential materials, our platform ensures convenience and time savings. It simplifies campus life with hassle-free errand services tailored to individual needs, saving time and reducing unnecessary hassle.
          </p>
        </div>
      </section>
      <Lfooter />
    </div>
  );
}

export default AboutUs;
