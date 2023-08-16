import React, { Component } from 'react';
import './App.css';
import HomePage from './pages/HomePage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>aBitMotivation</h1>
        <HomePage />
      </div>
    );
  }
}

export default App;