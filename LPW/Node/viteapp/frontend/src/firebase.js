// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApYIsISmRFDeD8crunY70ygFE6nawb79o",
  authDomain: "test-auth-72b99.firebaseapp.com",
  projectId: "test-auth-72b99",
  storageBucket: "test-auth-72b99.appspot.com",
  messagingSenderId: "931423958489",
  appId: "1:931423958489:web:0e01a3b2e7723cab7e15c8",
  measurementId: "G-HRLNPJ8E3Q"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export default app;