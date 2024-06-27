import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import AppHeader from './Header';
import RentedHomes from './RentedHomes';
import Contact from './Contact';
import { Layout } from 'antd';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth) {
      setIsAuthenticated(JSON.parse(storedAuth));
    }
    setLoading(false);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', JSON.stringify(true));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <Router>
      <Layout className="appLayout">
        {isAuthenticated && <AppHeader isAuthenticated={isAuthenticated} onLogout={handleLogout} />}
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          {isAuthenticated ? (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/rented-homes" element={<RentedHomes />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/" element={<Navigate to="/dashboard" />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
