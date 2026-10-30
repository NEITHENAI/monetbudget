import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAy8qy-90nX5LPlnRoV580NycDDJt_i4X0",
  authDomain: "studio-7628266772-d55b9.firebaseapp.com",
  projectId: "studio-7628266772-d55b9",
  storageBucket: "studio-7628266772-d55b9.firebasestorage.app",
  messagingSenderId: "246934928782",
  appId: "1:246934928782:web:cc48510d86da0105bab8df"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
