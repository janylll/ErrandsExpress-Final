import React from 'react';
import { Outlet } from 'react-router-dom';
import Rheader from './runnerheader';
import Rsidebar from './runnersidebar';
import './runnerlayout.css';
import '../../assets/ustpmap.jpg'

function Runnerlayout({ children }) {
  return (
    <div className="layout">
      <Rsidebar />

      <div className="main-area">
        <Rheader />
        <main className="runner-content">
          <div className="runner-posts-area">
            <Outlet />
          </div>
          <div className="runner-map-area">
            <img src="ustpmap.png" alt="Map" className="map-img" />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Runnerlayout;
