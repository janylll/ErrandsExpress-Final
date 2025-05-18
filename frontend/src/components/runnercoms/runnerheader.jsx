import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/ErrandsLogo.png';
import logo2 from '../../assets/Runnerslogo.png';
import './runnerheader.css';

function Rheader() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isRunnerMode = location.pathname.startsWith('/runner');
  const [currentLogo, setCurrentLogo] = useState(isRunnerMode ? logo2 : logo);

  const [userName, setUserName] = useState('User');

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData && userData.name) {
      setUserName(userData.name);
    }
  }, []);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    localStorage.removeItem('user'); // optional: clear user info
    navigate('/auth');
  };

  const handleModeSwitch = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentLogo(isRunnerMode ? logo : logo2);
    }, 1000);
    setTimeout(() => {
      navigate(isRunnerMode ? '/home' : '/runner');
    }, 2500);
  };

  return (
    <div className="content-area">
      <header className="rmain-header">
        <div className="header-left" onClick={() => navigate(isRunnerMode ? '/runner' : '/home')} style={{ cursor: 'pointer' }}>
          <img src={currentLogo} alt="Errands Logo" className="sidebar-logo" />
          <h1 className="logo-title">Errands Express</h1>
        </div>

        <div className="header-right">
          <a className="runner-mode" onClick={handleModeSwitch} style={{ cursor: 'pointer' }}>
            {isRunnerMode ? 'Customer Mode' : 'Runner Mode'}
          </a>

          <div className="profile-info">
            <div className="profile-circle">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="rprofile-name">{userName}</div>
          </div>

          <button className="hamburger-menu-btn" onClick={toggleDropdown}>
            ☰
          </button>

          {dropdownOpen && (
            <div className="dropdown-menu">
              <ul>
                <li onClick={() => navigate(isRunnerMode ? '/runner' : '/home')}>Home</li>
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

export default Rheader;
