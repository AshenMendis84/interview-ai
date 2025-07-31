
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBQtfPh152Wxqt36shF-7jle5KkMVm2Bzs",
  authDomain: "interviewerai-268f6.firebaseapp.com",
  projectId: "interviewerai-268f6",
  storageBucket: "interviewerai-268f6.firebasestorage.app",
  messagingSenderId: "1065926347177",
  appId: "1:1065926347177:web:739f028ef285e084c75cb8",
  measurementId: "G-Z9ZX96WQGM"
};

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app)