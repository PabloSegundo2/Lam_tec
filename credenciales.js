// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyChcZ5cXKdIs-bREBilkyJpdOoinRwBLj8",
    authDomain : "proyecto-4d5c3.firebaseapp.com" , 
    databaseURL: "https://proyecto-4d5c3-default-rtdb.firebaseio.com",
    projectId : "project-4d5c3" , 
    storageBucket: "proyecto-4d5c3.firebasestorage.app",
    messagingSenderId: "73872299206",
    appId: "1:73872299206:web:8392b5ee7dd676f929f3c7",
    measurementId: "G-RG51BNQL4S"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

