import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Chatroom from './Chatroom.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Chatroom />
      </div>
    );
  }
}

export default App;
