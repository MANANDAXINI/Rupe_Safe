import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

export function getFirebaseAdmin() {
  // Check if app already initialized
  if (getApps().length > 0) {
    return getApps()[0];
  }

  // Validate required env vars
  if (!process.env.FIREBASE_PROJECT_ID) {
    throw new Error('FIREBASE_PROJECT_ID is not set');
  }
  if (!process.env.FIREBASE_CLIENT_EMAIL) {
    throw new Error('FIREBASE_CLIENT_EMAIL is not set');
  }
  if (!process.env.FIREBASE_PRIVATE_KEY) {
    throw new Error('FIREBASE_PRIVATE_KEY is not set');
  }

  // Parse private key correctly
  const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');

  const app = initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: privateKey,
    }),
  });

  return app;
}

export function firebaseAuth() {
  return getAuth(getFirebaseAdmin());
}