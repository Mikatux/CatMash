import React, { Component } from 'react';
import logo from '../logo.jpg';
import '../Styles/Home.css';
import firebase from 'firebase';
import firebaseConfig from '../../firebaseConfig.js';
//var app = firebase.initializeApp({ firebaseConfig });
class App extends Component {
  render() {
    return (
      <div className="Home">
        <div className="Home-header">
          <img src={logo} className="Home-logo" alt="logo" />
          <h2>Welcome to CatMash</h2>
        </div>
        <p className="Home-intro">
        </p>
      </div>
    );
  }
}

export default App;
