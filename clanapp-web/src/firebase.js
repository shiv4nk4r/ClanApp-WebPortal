import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDAm-PtUEvUP5jj40ZCO4DSh65Km4enpGo",
  authDomain: "clanappwebpanel.firebaseapp.com",
  databaseURL: "https://clanappwebpanel.firebaseio.com",
  projectId: "clanappwebpanel",
  storageBucket: "clanappwebpanel.appspot.com",
  messagingSenderId: "1007828115014",
  appId: "1:1007828115014:web:37daffa16a0199686fb447",
  measurementId: "G-ENCRV7K6KK",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
