import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';

import ProfilePage from './pages/ProfilePage';
import CalendarPage from './pages/CalendarPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Layout from './pages/Layout';

function App() {
  const [token, setToken] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  // Function to handle user login and set the token
  const handleLogin = (authToken) => {
    localStorage.setItem('token', authToken);

    setToken(authToken);
    setAuthenticated(true);
  };

  // Function to handle user logout and clear the token
  const handleLogout = () => {
    localStorage.removeItem('token');

    setToken(null);
    setAuthenticated(false);
  };

  // Effect to check if a token exists in localStorage on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      setToken(storedToken);
      setAuthenticated(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout token={token}  onLogout={handleLogout}/>}>
          <Route path="/" element={authenticated ? (
            <CalendarPage token={token} />
          ) : (
            <Navigate to="/login" />
          )}>
          </Route>
          <Route path="/profile" element={authenticated ? (
            <ProfilePage token={token} />
          ) : (
            <Navigate to="/login" />
          )}>
          </Route>
          <Route path="/login" element={authenticated ? <Navigate to="/" /> : <LoginPage onLogin={handleLogin} />}>
          </Route>
          <Route path="/register" element={authenticated ? <Navigate to="/" /> : <RegisterPage />}>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter >
  );
}

export default App;