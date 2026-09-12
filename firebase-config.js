// firebase-config.js
// Replace these values with your Firebase Web App configuration.

const firebaseConfig = {
  apiKey: "AIzaSyCZZP5VxjyLmIy3fIXiP_sCrMR1jIF6LTI",
  authDomain: "cricketapp-c1273.firebaseapp.com",
  projectId: "cricketapp-c1273",
  storageBucket: "cricketapp-c1273.firebasestorage.app",
  messagingSenderId: "835964581502",
  appId: "1:835964581502:web:690293aa6a3e0bd0824a2f",
  measurementId: "G-1930RJM5KK"
};
// Firebase CDN imports
import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
