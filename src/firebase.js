import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDquVGMWXfzlNPh1qimAB1VxrrEne6eK4c",
  authDomain: "whatsapp-clone-8d59c.firebaseapp.com",
  projectId: "whatsapp-clone-8d59c",
  storageBucket: "whatsapp-clone-8d59c.appspot.com",
  messagingSenderId: "220059756344",
  appId: "1:220059756344:web:4836822cb2595d625ac3cd"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();


export {auth,provider};
export default db;