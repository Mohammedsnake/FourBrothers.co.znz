import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, set, onValue, get, child } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyANon-yn07vz_hr5ZkOXtOTrHt-uuX1CPA",
  authDomain: "loverapploginpage.firebaseapp.com",
  projectId: "loverapploginpage",
  storageBucket: "loverapploginpage.appspot.com",
  messagingSenderId: "749614354027",
  appId: "1:749614354027:web:e996afd0bab1bc45ac6b2e",
  measurementId: "G-5ZLBC9JKP3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { 
  database, ref, push, set, onValue, get, child,
  auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, 
  onAuthStateChanged, signOut,
  storage, storageRef, uploadBytes, getDownloadURL
};