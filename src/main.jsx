import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { getFirestore } from 'firebase/firestore';
import { getAuth} from 'firebase/auth';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import './index.css'
import App from './App.jsx'

// --- Firebase Initialization (Required Setup) ---
// These global variables are provided by the Canvas environment.
// Ensure they are accessed safely.
// const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
// const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? initialAuthToken : null; // Fixed typo: initialAuthToken

const firebaseConfig = {
  apiKey: "AIzaSyAs9VcnsO8oux20n5lUgQlKR3y5AASIgCQ",
  authDomain: "nsreekum-portfolio.firebaseapp.com",
  projectId: "nsreekum-portfolio",
  storageBucket: "nsreekum-portfolio.firebasestorage.app",
  messagingSenderId: "861574725924",
  appId: "1:861574725924:web:31d63ad6387634f0eaf3b1",
  measurementId: "G-V2CQRFZZH9"
};

// Initialize Firebase App
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
