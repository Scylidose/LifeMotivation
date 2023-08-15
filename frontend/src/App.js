import React, { Component } from 'react';
import './App.css';
import ActionForm from './components/ActionForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>aBitMotivation</h1>
        <ActionForm />
      </div>
    );
  }
}

export default App;