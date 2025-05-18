import { useState } from 'react';
import logo from '../../assets/ErrandsLogo.png';
import './Lnavbar.css';
import { Link } from 'react-router-dom';

function Lnavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="Lheader">
      <div className="logo-container">
        <img src={logo} alt="Errands Express Logo" className="header-logo" />
        <h1 className="logo">Errands Express</h1>
      </div>

      <nav className={`nav ${menuOpen ? 'open' : ''}`}>
        <ul className="nav-links">
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link></li>
          <li><Link to="/feedbacks" onClick={() => setMenuOpen(false)}>Feedbacks</Link></li>
          <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link></li>
          <li><Link to="/auth" onClick={() => {window.scrollTo({ top: 0, behavior: 'smooth' });}}>Sign Up</Link></li>        
        </ul>
      </nav>

      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </header>
  );
}

export default Lnavbar;
