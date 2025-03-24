// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDaPq6tSXGluSFShu6XOFd07XUFA7oT5Ls",
    authDomain: "fir-books-f2a69.firebaseapp.com",
    projectId: "fir-books-f2a69",
    storageBucket: "fir-books-f2a69.firebasestorage.app",
    messagingSenderId: "637260646974",
    appId: "1:637260646974:web:d7f482dd24b335021a1f6f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)