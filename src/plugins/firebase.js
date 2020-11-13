import firebaseConfig from "../config/firebase";
import firebase from "firebase";
import 'firebase/firestore'

//const firestore = firebase.initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
export default db;