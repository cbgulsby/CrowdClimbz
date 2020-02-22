import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDfOuH54N5dKv5zqVZ3CylTZpn7y2eC9GI",
  authDomain: "crowdclimbz.firebaseapp.com",
  databaseURL: "https://crowdclimbz.firebaseio.com",
  storageBucket: "crowdclimbz.appspot.com"
};

firebase.initializeApp(firebaseConfig);