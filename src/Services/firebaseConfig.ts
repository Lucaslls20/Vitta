import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBkaI0FvtTSv1Guy86Ln4tbpgpOmy2cov4",
  authDomain: "vitta-b4c32.firebaseapp.com",
  projectId: "vitta-b4c32",
  storageBucket: "vitta-b4c32.firebasestorage.app",
  messagingSenderId: "692157742605",
  appId: "1:692157742605:web:6a387271b50225c4949f44",
  measurementId: "G-WH0WFT8DET"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const db = getFirestore(app)
export	 const storage = getStorage(app)
