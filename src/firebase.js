import firebase from 'firebase';

import "firebase/firestore";
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyA27mRY-VFOuBVQB9l3rshkQmdCAeaUxm4",
    authDomain: "amcef-a87a9.firebaseapp.com",
    projectId: "amcef-a87a9",
    storageBucket: "amcef-a87a9.appspot.com",
    messagingSenderId: "124673923212",
    appId: "1:124673923212:web:b169fbb596e2b6a7e043a9",
    measurementId: "G-QNQZ9XKE0P"
  };
 
  let app = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore(app);
  const ListsRef = db.collection("lists")

  export { ListsRef };