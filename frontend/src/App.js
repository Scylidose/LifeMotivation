import React, { Component } from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import CalendarPage from './pages/CalendarPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>aBitMotivation</h1>
        <h2>Calendar</h2>
        <CalendarPage />

        <h2>All Actions and Objectives</h2>
        <HomePage />
      </div>
    );
  }
}

export default App;