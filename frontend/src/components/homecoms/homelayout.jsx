import React, { useState } from 'react';
import Sidebar from './homeSidebar';
import Header from './homeHeader';
import { Outlet } from 'react-router-dom';
import './HomeLayout.css';

function Layout() {
  // Here we store the posts state and the function to update it.
  const [posts, setPosts] = useState([]);

  return (
    <div className="layout">
      <Sidebar />

      <div className="main-area">
        <Header />
        <main className="content">
          {/* Provide context for children (like Home, Inbox, etc.) */}
          <Outlet context={{ posts, setPosts }} />
        </main>
      </div>
    </div>
  );
}

export default Layout;
