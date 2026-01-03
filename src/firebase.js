// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// TODO: Replace with your Firebase config
// Get this from Firebase Console > Project Settings > General > Your apps
const firebaseConfig = {
  apiKey: "AIzaSyB7U822dP2c8f4v7PJCh-Y8BSMiwfkov1g",
  authDomain: "talkdev-906c0.firebaseapp.com",
  projectId: "talkdev-906c0",
  storageBucket: "talkdev-906c0.firebasestorage.app",
  messagingSenderId: "1097887122990",
  appId: "1:1097887122990:web:746af687598c13b0d801bf",
  measurementId: "G-2RQ5QC4LCG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Firebase Analytics (only in browser environment)
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export default app;
