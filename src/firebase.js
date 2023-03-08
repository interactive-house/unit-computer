import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/compat/database";
import "firebase/compat/storage";



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAARTIphiZDZ29MmvwacxciIsqzs5FKd0A",
    authDomain: "softwareengineering-1b57b.firebaseapp.com",
    projectId: "softwareengineering-1b57b",
    storageBucket: "softwareengineering-1b57b.appspot.com",
    messagingSenderId: "937237781476",
    appId: "1:937237781476:web:fc9a3eb3942cca125885f1",
    measurementId: "G-C1WZP2CME6"
};



firebase.initializeApp(firebaseConfig)

export default firebase
