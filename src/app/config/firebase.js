import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDy0M9G22zjakhYeX-x_G71Es88tN-2zmQ",
    authDomain: "revents-73a7d.firebaseapp.com",
    databaseURL: "https://revents-73a7d.firebaseio.com",
    projectId: "revents-73a7d",
    storageBucket: "",
    messagingSenderId: "647176740701",
}

firebase.initializeApp(firebaseConfig);
firebase.firestore();

// required for correct date
const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);

export default firebase;