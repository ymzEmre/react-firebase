import * as firebase from 'firebase';
var firebaseConfig = {
  databaseURL: 'https://react-firebase-5225f.firebaseio.com',
  projectId: 'react-firebase-5225f',
};
var fireDb = firebase.initializeApp(firebaseConfig);

export default fireDb.database().ref();
