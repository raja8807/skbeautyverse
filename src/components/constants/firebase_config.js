const { getApps } = require("firebase/app");
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";


const firebaseConfig = {
  apiKey: "AIzaSyAsIZTUloiZFea0cZiYQ_vfjAR6oHhNOHQ",
  authDomain: "sk-beautyverse.firebaseapp.com",
  projectId: "sk-beautyverse",
  storageBucket: "sk-beautyverse.appspot.com",
  messagingSenderId: "342587440251",
  appId: "1:342587440251:web:451622967160003137b6de",
  measurementId: "G-XZZCW7NNP5",
};

let firebase_app =
  getApps().length === 0
    ? firebase.initializeApp(firebaseConfig)
    : getApps()[0];

const fireBaseCustomerAuth = getAuth(firebase_app);

export default fireBaseCustomerAuth