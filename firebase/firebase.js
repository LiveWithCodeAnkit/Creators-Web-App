import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCWwHCam6j_oCvoqRVgLV6d7oSU6WZIcZE",
  authDomain: "task-internship-b3f86.firebaseapp.com",
  projectId: "task-internship-b3f86",
  storageBucket: "task-internship-b3f86.appspot.com",
  messagingSenderId: "690861868376",
  appId: "1:690861868376:web:80aa9a70b9a4851a4ed12d",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
