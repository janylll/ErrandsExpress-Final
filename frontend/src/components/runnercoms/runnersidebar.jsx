import { NavLink } from 'react-router-dom';
import './runnersidebar.css';

function Rsidebar() {
  return (
    <aside className="rsidebar">
      <nav className="Sidebarnav-links">
        <NavLink to="/runner" end className={({ isActive }) => isActive ? 'active-link' : ''}>Home</NavLink>
        <NavLink to="/runner/notification" className={({ isActive }) => isActive ? 'active-link' : ''}>Notification</NavLink>
        <NavLink to="/runner/inbox" className={({ isActive }) => isActive ? 'active-link' : ''}>Inbox</NavLink>
      </nav>
    </aside>
  );
}

export default Rsidebar;
