import  Rebase from 're-base';
import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyD0dLAldfQG3T_gGdSN6ivGIOJjYqGTezw",
  authDomain: "catch-of-the-day-gg-8c1ad.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-gg-8c1ad.firebaseio.com",
};

const firebaseApp = firebase.initializeApp(config);

const base = Rebase.createClass(firebaseApp.database());

export default base;
