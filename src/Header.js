import React from 'react';
import { Layout, Typography } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css'; 

const { Header } = Layout;

const AppHeader = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === '/login') {
    return null;
  }

  return (
    <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className="logo" style={{ color: 'white', fontSize: '20px', marginRight: '20px' }}>Real Estate</div>
      </div>
      <Typography.Title level={3} style={{ color: 'white', margin: 0, textAlign: 'center', flex: 1 }}>
        Find Your Dream Home Today!
      </Typography.Title>
      {isAuthenticated && (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/dashboard" style={{ color: 'white', marginRight: '20px' }}>Dashboard</Link>
          <Link to="/contact" style={{ color: 'white', marginRight: '20px' }}>Contact</Link>
          <span
            onClick={() => {
              onLogout();
              navigate('/login');
            }}
            style={{ color: 'white', cursor: 'pointer' }}
          >
            Log out
          </span>
        </div>
      )}
    </Header>
  );
};

export default AppHeader;
