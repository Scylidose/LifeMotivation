import React, { Component } from 'react';
import './App.css';
import ActionForm from './ActionForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>aBitMotivation</h1>
        <button id="create-action-button">Create New Action</button>  
        <ActionForm />
      </div>
    );
  }
}

export default App;