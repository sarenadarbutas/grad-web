import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'; // Import getAuth from firebase/auth


const firebaseConfig = {
  apiKey: "AIzaSyDy5sLCduo_RtDwCO2aVyM1NkLtnx4So18",
  authDomain: "graduation-planner-a5209.firebaseapp.com",
  projectId: "graduation-planner-a5209",
  storageBucket: "graduation-planner-a5209.appspot.com",
  messagingSenderId: "870550339020",
  appId: "1:870550339020:web:a809a5ae9fe8c3f9cb3169"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app); 