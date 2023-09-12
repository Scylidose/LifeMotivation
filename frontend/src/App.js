import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ProfilePage from './pages/ProfilePage';
import CalendarPage from './pages/CalendarPage';
import Layout from './pages/Layout';
import { useUser } from './context/UserContext';
import ProtectedRoute from './context/ProtectedRoute';
import Login from './components/Login';

function App() {
  const { user } = useUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route path="/login" component={Login} />
          <ProtectedRoute
            index
            component={CalendarPage}
          />
          <ProtectedRoute
            path="/profile"
            component={ProfilePage}
          />
        </Route>
      </Routes>
    </BrowserRouter >
  );
}

export default App;