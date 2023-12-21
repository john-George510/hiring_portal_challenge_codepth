// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDtIxlvpgJa2lWDtr6nYhro4Qc7iGGFYaw",
  authDomain: "jobvista-78f5e.firebaseapp.com",
  projectId: "jobvista-78f5e",
  storageBucket: "jobvista-78f5e.appspot.com",
  messagingSenderId: "465309509408",
  appId: "1:465309509408:web:0cd711dd77822cea13d945",
  measurementId: "G-J5ZMG7Y60Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db}