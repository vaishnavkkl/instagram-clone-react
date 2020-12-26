import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB4bILORuffzLfG78ouipm63DZRh1_Di9A",
  authDomain: "instagram-clone-8648e.firebaseapp.com",
  databaseURL: "https://instagram-clone-8648e-default-rtdb.firebaseio.com",
  projectId: "instagram-clone-8648e",
  storageBucket: "instagram-clone-8648e.appspot.com",
  messagingSenderId: "1000581690183",
  appId: "1:1000581690183:web:55c8307951ac6ace645262",
  measurementId: "G-TPL53DM7C1"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db,auth,storage}  ;