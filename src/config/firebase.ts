// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDvKUTayS4pk-aTAgkt9lWstM3rkmnFtY",
  authDomain: "social-media-2698b.firebaseapp.com",
  projectId: "social-media-2698b",
  storageBucket: "social-media-2698b.appspot.com",
  messagingSenderId: "79225124853",
  appId: "1:79225124853:web:1ad507ec8a841ac9f1d2bc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const provider=new GoogleAuthProvider();
export const db = getFirestore(app);