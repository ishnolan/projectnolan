import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);

  const handleTitleClick = () => {
    setClicked(true);
  };

  return (
    <div className="dashboard-container">
      <h1
        className={`dashboard-title ${clicked ? 'clicked' : ''}`}
        onClick={handleTitleClick}
      >
        📦 Warehouse Dashboard
      </h1>

      <div className="button-grid">
        <button className="dashboard-btn" onClick={() => navigate('/product')}>🛒 Manage Products</button>
        <button className="dashboard-btn" onClick={() => navigate('/customer')}>👥 Manage Customers</button>
        <button className="dashboard-btn" onClick={() => navigate('/order')}>🧾 Orders</button>
        <button className="dashboard-btn" onClick={() => navigate('/general')}>📊 General Report</button>
      </div>
    </div>
  );
};

export default Dashboard;
