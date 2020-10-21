import firebase from "firebase";

//UPDATE FIREBASE API HERE
const firebaseApp = firebase.initializeApp({
  apiKey: "",
  authDomain: "clanappwebpanel.firebaseapp.com",
  databaseURL: "https://clanappwebpanel.firebaseio.com",
  projectId: "clanappwebpanel",
  storageBucket: "clanappwebpanel.appspot.com",
  messagingSenderId: "",
  appId: "",
  measurementId: "G-ENCRV7K6KK",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
