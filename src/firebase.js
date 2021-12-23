import * as firebase from 'firebase';
var firebaseConfig = {
  apiKey: process.env.FR_API_KEY,
  authDomain: 'react-firebase-5225f.firebaseapp.com',
  databaseURL: 'https://react-firebase-5225f.firebaseio.com',
  projectId: 'react-firebase-5225f',
  storageBucket: 'react-firebase-5225f.appspot.com',
  messagingSenderId: '776521750025',
  appId: '1:776521750025:web:9b54f82da13f8195ee0ad8',
};
// Initialize Firebase
var fireDb = firebase.initializeApp(firebaseConfig);

export default fireDb.database().ref();
