import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCPEpF9XbFVjNR1SHtJbeYIgjeNu9XdC2E",
    authDomain: "goal-coach-2f62a.firebaseapp.com",
    databaseURL: "https://goal-coach-2f62a.firebaseio.com",
    projectId: "goal-coach-2f62a",
    storageBucket: "goal-coach-2f62a.appspot.com",
    messagingSenderId: "881634486041"
};

const firebaseApp = firebase.initializeApp(config);

const db = firebase.firestore();

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});

export const auth = firebaseApp.auth();
export const firestore = db;