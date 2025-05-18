import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/ErrandsLogo.png';
import logo2 from '../../assets/Runnerslogo.png';
import './homeHeader.css';

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentLogo, setCurrentLogo] = useState(logo);
  const [username, setUsername] = useState('User');

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData && userData.name) {
      setUsername(userData.name);
    }
  }, []);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    localStorage.removeItem('user'); // optional
    navigate('/');
  };

  const handleRunnerModeClick = () => {
    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentLogo(logo2);
    }, 1000);

    setTimeout(() => {
      navigate('/runner');
    }, 2500);
  };

  const firstLetter = username.charAt(0).toUpperCase();

  return (
    <div className="content-area">
      <header className="main-header">
        <div
          className="header-left"
          onClick={() => navigate('/home')}
          style={{ cursor: 'pointer' }}
        >
          <img src={logo} alt="Errands Logo" className="sidebar-logo" />
          <h1 className="logo-title">Errands Express</h1>
        </div>

        <div className="header-right">
          <a className="runner-mode" onClick={handleRunnerModeClick} style={{ cursor: 'pointer' }}>
            Runner Mode
          </a>

          <div className="profile-info">
            <div className="profile-circle">{firstLetter}</div>
            <span className="profile-name">{username}</span>
          </div>

          <button className="hamburger-menu-btn" onClick={toggleDropdown}>
            ☰
          </button>

          {dropdownOpen && (
            <div className="dropdown-menu">
              <ul>
                <li onClick={() => navigate('/home')}>Home</li>
                <li>Settings</li>
                <li onClick={handleLogout}>Log Out</li>
              </ul>
            </div>
          )}
        </div>
      </header>

      {isTransitioning && (
        <div className="runner-transition">
          <img src={currentLogo} className="runner-logo" alt="Flipping Logo" />
        </div>
      )}
    </div>
  );
}

export default Header;
