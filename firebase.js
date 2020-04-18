import * as firebase from 'firebase';
import "firebase/auth";
import "@firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
	apiKey: "AIzaSyDfOuH54N5dKv5zqVZ3CylTZpn7y2eC9GI",
  	authDomain: "crowdclimbz.firebaseapp.com",
  	databaseURL: "https://crowdclimbz.firebaseio.com",
  	projectId: "crowdclimbz",
  	storageBucket: "crowdclimbz.appspot.com",
  	messagingSenderId: "760059550596",
  	appId: "1:760059550596:web:a88049a666755ee2ec1bd1",
  	measurementId: "G-3RRKPJLYNG",
  	storageBucket: "crowdclimbz.appspot.com"
};

firebase.initializeApp(firebaseConfig);

export default firebase;