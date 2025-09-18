// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider,GithubAuthProvider,getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "myapp-411b1.firebaseapp.com",
  projectId: "myapp-411b1",
  storageBucket: "myapp-411b1.appspot.com",
  messagingSenderId: "832383328202",
  appId: "1:832383328202:web:ec3562233b368eca9bf933"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const googleProvider= new GoogleAuthProvider()
const githubProvider= new GithubAuthProvider()

export {auth,googleProvider,githubProvider}