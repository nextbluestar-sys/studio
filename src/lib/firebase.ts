
import { initializeApp, getApp, getApps } from 'firebase/app';

const firebaseConfig = {
  projectId: "managepro-8rltu",
  appId: "1:711705154442:web:2e91594ec65ab2e3eaae73",
  storageBucket: "managepro-8rltu.firebasestorage.app",
  apiKey: "AIzaSyDAO4vc1SaqAzLRPDckp11DryMGdaFjclI",
  authDomain: "managepro-8rltu.firebaseapp.com",
  messagingSenderId: "711705154442"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export { app };
