'use strict';
import * as Firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBxLYjM1p5G0c2hYI59hiQmCVw_VQsmzb4",
  authDomain: "golfmanager-1f9b8.firebaseapp.com",
  databaseURL: "https://golfmanager-1f9b8.firebaseio.com",
  storageBucket: "golfmanager-1f9b8.appspot.com",
};
const firebaseApp = Firebase.initializeApp(firebaseConfig);

module.exports.FirebaseApp = firebaseApp;
