import firebase from 'firebase'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyDtbOZJvwTb1_p2TfILoFcYsylmCfMQ688",
    authDomain: "ontaapp-1827a.firebaseapp.com",
    projectId: "ontaapp-1827a",
    storageBucket: "ontaapp-1827a.appspot.com",
    messagingSenderId: "845805564912",
    appId: "1:845805564912:web:f4e7a6ddeda9460e27e335",
    measurementId: "G-NP92JRZ41P"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore()
export default {
    firebase,
    db
}