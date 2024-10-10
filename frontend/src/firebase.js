import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-app-ea079.firebaseapp.com",
  projectId: "mern-blog-app-ea079",
  storageBucket: "mern-blog-app-ea079.appspot.com",
  messagingSenderId: "93431070111",
  appId: "1:93431070111:web:75e8a1f38227df5fb8d1aa",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
