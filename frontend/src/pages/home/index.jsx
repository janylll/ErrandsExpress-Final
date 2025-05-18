import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import ErrandsHome from './ErrandsHome';
import './index.css';

function AppLayout() {
  const [posts, setPosts] = useState([
    {
      content: "Pick up groceries",
      deadlineDate: "2025-05-15",
      deadlineTime: "14:30",
      destination: "Supermarket",
      status: "pending",
      createdAt: {
        date: "May 10, 2025",
        time: "2:00 PM",
      },
    },
    {
      content: "Deliver package to office",
      deadlineDate: "2025-05-16",
      deadlineTime: "10:00",
      destination: "Downtown Office",
      status: "accepted",
      createdAt: {
        date: "May 9, 2025",
        time: "3:45 PM",
      },
    },
  ]);

  return (
    <Outlet context={{ posts, setPosts }} />
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<ErrandsHome />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
