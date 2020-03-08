import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyACxr03OjD51J2ymYptFzTDkIAG5JEiv00",
  authDomain: "dragon-colecionaveis-85007.firebaseapp.com",
  databaseURL: "https://dragon-colecionaveis-85007.firebaseio.com",
  projectId: "dragon-colecionaveis-85007",
  storageBucket: "dragon-colecionaveis-85007.appspot.com",
  messagingSenderId: "427779791590",
  appId: "1:427779791590:web:d387c507f359ef71bab927",
  measurementId: "G-G64133996W"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const creatAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        creatAt,
        ...additionalData
      });
    } catch (error) {
      console.log("Error adding user to the database " + error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
