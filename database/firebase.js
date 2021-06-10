import firebase from 'firebase'
import 'firebase/firestore'

var firebaseConfig = {
  //INSERT API KEY
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore()
export default {
    firebase,
    db
}