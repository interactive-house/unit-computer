import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";
import "firebase/compat/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOZcBxs3RkxuxDrf5vT2HwexFh3ZCw94c",
  authDomain: "smarthome-3bb7b.firebaseapp.com",
  databaseURL: "https://smarthome-3bb7b-default-rtdb.firebaseio.com",
  projectId: "smarthome-3bb7b",
  storageBucket: "smarthome-3bb7b.appspot.com",
  messagingSenderId: "642589059290",
  appId: "1:642589059290:web:bf23df5327b9e305c81de3",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
