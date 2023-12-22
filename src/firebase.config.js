// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getMessaging, onMessage, getToken } from 'firebase/messaging'

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
const auth = getAuth(app);
const messaging = getMessaging(app);
const storage = getStorage(app);

export const requestForToken = () => {
  return getToken(messaging, { vapidKey: 'BHpPSoewgN10ROSaePAdAwg4GucPgAFL9Rqq9L95a1sepstJVwl70g3yDiqRIV0CsutmjivUkIeEhuTN90A9i88' })
    .then((currentToken) => {
      if (currentToken) {
          console.log(currentToken)
      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
}

export const onMessageListener = () => {
  return new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("on message listener", payload);
      resolve(payload);
    });
  });
}


export { db, auth, storage, messaging }