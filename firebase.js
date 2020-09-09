const firebase = require('firebase/app')
require('firebase/storage')
require('firebase/auth')
require('firebase/database')

var firebaseConfig = {
  apiKey: "AIzaSyD8ctV5uEHdKvaf20aNQcGFKYF9QQ3jw4M",
   authDomain: "biuapp-483f9.firebaseapp.com",
   databaseURL: "https://biuapp-483f9.firebaseio.com",
   projectId: "biuapp-483f9",
   storageBucket: "biuapp-483f9.appspot.com",
   messagingSenderId: "1071000431108",
   appId: "1:1071000431108:web:02eb64b169efa6a1b0e351",
   measurementId: "G-YTTCF6EFKB"
 };
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);


 module.exports = firebase