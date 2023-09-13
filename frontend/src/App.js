import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';

import jwt from 'jwt-decode';

import ProfilePage from './pages/ProfilePage';
import BitsPage from './pages/BitsPage';
import BitDetailPage from './pages/BitDetailPage';
import ObjectivesPage from './pages/ObjectivesPage';
import ObjectiveDetailPage from './pages/ObjectiveDetailPage';
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

    return <Navigate to="/login" />;
  };

  // Effect to check if a token exists in localStorage on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      const decodedToken = jwt(storedToken);
      if (Date.now() >= decodedToken.exp * 1000) {
        handleLogout();
      } else {
        setToken(storedToken);
        setAuthenticated(true);
      }
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout token={token} onLogout={handleLogout} />}>
          <Route path="/" element={<CalendarPage token={token} />} />
          <Route path="/profile" element={<ProfilePage token={token} />} />
          <Route path="/objectives" element={<ObjectivesPage token={token} />} />
          <Route path="/objective/:id" element={<ObjectiveDetailPage token={token} />} />
          <Route path="/bits" element={<BitsPage token={token} />} />
          <Route path="/bit/:id" element={<BitDetailPage token={token} />} />
          <Route path="/login" element={authenticated ? <Navigate to="/" /> : <LoginPage onLogin={handleLogin} />} />
          <Route path="/register" element={authenticated ? <Navigate to="/" /> : <RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter >
  );
}

export default App;