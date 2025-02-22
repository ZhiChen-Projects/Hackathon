
// firebase-config.js
const firebase = require('firebase/app');
require('firebase/firestore'); // Import Firestore if you are using it

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get Firestore database reference
const db = firebase.firestore();

module.exports = db;  // Export it for use in other parts of your app
