// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD8udQiLdUadMrt2qpTbNYcKWulKmianWQ",
  authDomain: "recipe-ee36a.firebaseapp.com",
  projectId: "recipe-ee36a",
  storageBucket: "recipe-ee36a.firebasestorage.app",
  messagingSenderId: "971668017997",
  appId: "1:971668017997:web:335208883909e3d82e5d04",
  measurementId: "G-2MFMLYZRHZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Export only once
export { app, auth };