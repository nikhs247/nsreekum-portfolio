import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

import './index.css'
import App from './App.jsx'

// --- Firebase Initialization (Required Setup) ---
// These global variables are provided by the Canvas environment.
// Ensure they are accessed safely.
// const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
// const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? initialAuthToken : null; // Fixed typo: initialAuthToken

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
