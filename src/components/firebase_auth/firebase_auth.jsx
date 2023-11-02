import { getApps } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  //   updatePhoneNumber,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

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

const auth = getAuth(firebase_app);

//   const app = firebase.initializeApp(firebaseConfig);
//   const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
//   const analytics = getAnalytics(app);

//   const signIn = () => auth.signInWithPopup(provider);
export const fireBaseSignOut = () => auth.signOut();

export async function fireBaseSignIn(email, password) {
  let result = null,
    error = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export const fireBaseSignUp = async (email, password) => {
  let result = null,
    error = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
};
