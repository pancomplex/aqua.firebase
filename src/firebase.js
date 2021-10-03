import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-DfS739VzKJU8_qPfhMZyMnRPj5gGeaQ",
  authDomain: "react-chattingapp.firebaseapp.com",
  projectId: "react-chattingapp",
  storageBucket: "react-chattingapp.appspot.com",
  messagingSenderId: "135876930581",
  appId: "1:135876930581:web:a40fee1af6ad1a6363721c",
  measurementId: "G-HQJS3PV87Q",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// firebase.analytics();

export default app;
