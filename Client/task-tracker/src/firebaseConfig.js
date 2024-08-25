// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAJbJXZXZI8Uppd0FHrOjCZKRkL9xBPtkY",
  authDomain: "bss-task-tracker.firebaseapp.com",
  projectId: "bss-task-tracker",
  storageBucket: "bss-task-tracker.appspot.com",
  messagingSenderId: "913370197273",
  appId: "1:913370197273:web:0debb5f9f74fa568e86988"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
