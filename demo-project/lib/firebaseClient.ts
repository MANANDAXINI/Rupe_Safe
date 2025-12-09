import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

/**
 * A helper function to trigger Google Sign-In popup and return the ID token.
 * This resolves the 'signInWithGoogle' not found error.
 */
const signInWithGoogle = async (): Promise<string> => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const idToken = await result.user.getIdToken();
    return idToken;
};

export { app, auth, signInWithGoogle };