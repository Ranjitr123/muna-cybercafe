import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const getEnv = (key: string): string => process.env[key] || '';

const DEFAULT_FIREBASE_CONFIG = {
  apiKey: getEnv('FIREBASE_API_KEY') || getEnv('NEXT_PUBLIC_FIREBASE_API_KEY'),
  authDomain: getEnv('FIREBASE_AUTH_DOMAIN') || getEnv('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN'),
  projectId: getEnv('FIREBASE_PROJECT_ID') || getEnv('NEXT_PUBLIC_FIREBASE_PROJECT_ID'),
  storageBucket: getEnv('FIREBASE_STORAGE_BUCKET') || getEnv('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: getEnv('FIREBASE_MESSAGING_SENDER_ID') || getEnv('NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID'),
  appId: getEnv('FIREBASE_APP_ID') || getEnv('NEXT_PUBLIC_FIREBASE_APP_ID'),
  measurementId: getEnv('FIREBASE_MEASUREMENT_ID') || getEnv('NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID'),
};

// Check if Firebase configuration is valid
export function isFirebaseConfigured(): boolean {
  return Boolean(DEFAULT_FIREBASE_CONFIG.apiKey && DEFAULT_FIREBASE_CONFIG.projectId);
}

// Initialize Firebase lazily & safely
const app = getApps().length === 0 ? initializeApp(DEFAULT_FIREBASE_CONFIG) : getApp();

export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export const storage = getStorage(app);
export default app;
