// Import only what’s safe to run server-side
import { initializeApp, getApps, getApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDi4gwpnDneMcyuqFyGEXaDvMKsa-EsTB8",
  authDomain: "vcity01-fa491.firebaseapp.com",
  projectId: "vcity01-fa491",
  storageBucket: "vcity01-fa491.firebasestorage.app",
  messagingSenderId: "82968031109",
  appId: "1:82968031109:web:706a7f9c40525fe07e9eec",
  measurementId: "G-43D0FL3FR4",
};

// Initialize (or reuse) the Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export storage unconditionally (safe on server and client)
export const storage = getStorage(app);

// ── NEW: analytics must only initialize in the browser ──
let analytics = null;
if (typeof window !== "undefined") {
  // Using require here so we don’t break SSR
  const { getAnalytics } = require("firebase/analytics");
  analytics = getAnalytics(app);
}

// Export analytics (will be null on the server)
export { analytics };
