import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import firebase from "firebase";

// Initialize Firebase
let config = {
    apiKey: "AIzaSyA_Fawyu29Zji3PYY6KSCgtqyf1rvI2Obw",
    authDomain: "ladyliberty-89a90.firebaseapp.com",
    databaseURL: "https://ladyliberty-89a90.firebaseio.com",
    storageBucket: "ladyliberty-89a90.appspot.com",
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
