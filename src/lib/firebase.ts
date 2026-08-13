import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const DEFAULT_FIREBASE_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyA-eGp26vZqUQ9_8Nq14wo32Uhqe5i5La0",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "munatechworld.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "munatechworld",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "munatechworld.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "613765538237",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:613765538237:web:7dd91889e9fa87534b72d4",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-XF3237HGN7",
};

// Check if Firebase configuration is valid
export function isFirebaseConfigured(): boolean {
  return Boolean(DEFAULT_FIREBASE_CONFIG.apiKey && DEFAULT_FIREBASE_CONFIG.projectId);
}

// Initialize Firebase lazily & safely
const app = getApps().length === 0 ? initializeApp(DEFAULT_FIREBASE_CONFIG) : getApp();
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
