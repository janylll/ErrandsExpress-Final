import { NavLink } from 'react-router-dom';
import './homeSidebar.css';
import { useEffect, useState } from 'react';

function Sidebar() {
  const [username, setUsername] = useState('User');

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData && userData.name) {
      setUsername(userData.name);
    }
  }, []);

  return (
    <aside className="sidebar">
      <nav className="Sidebarnav-links">
        <NavLink to="/profile" className={({ isActive }) => isActive ? 'active-link' : ''}>
          {username}
        </NavLink>
        <NavLink to="/home" className={({ isActive }) => isActive ? 'active-link' : ''}>
          Home
        </NavLink>
        <NavLink to="/notification" className={({ isActive }) => isActive ? 'active-link' : ''}>
          Notification
        </NavLink>
        <NavLink to="/inbox" className={({ isActive }) => isActive ? 'active-link' : ''}>
          Inbox
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
