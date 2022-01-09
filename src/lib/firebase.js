import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const config = {
  apiKey: "AIzaSyCCg2IxfUJPeHnn-xkcOy8-DnduYYflSdM",
  authDomain: "patricia-clone.firebaseapp.com",
  projectId: "patricia-clone",
  storageBucket: "patricia-clone.appspot.com",
  messagingSenderId: "236920895642",
  appId: "1:236920895642:web:9ecab3664cd0d320790723",
};

export const app = initializeApp(config);
export const db = getFirestore(app)
export const auth = getAuth(app)