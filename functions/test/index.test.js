const test = require('firebase-functions-test')({
    databaseURL: "https://goal-coach-2f62a.firebaseio.com",
    projectId: "goal-coach-2f62a",
    storageBucket: "goal-coach-2f62a.appspot.com",
}, '../goal-coach-2f62a-079726990dd9.json');

const myFunctions = require('../index.js');