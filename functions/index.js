const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.createUser = functions.auth.user().onCreate((user) => {
    firestore.collection('users').doc(user.uid).set({
        email: user.email,
        goals: {},
        presence: true
    })
        .then((docRef) => {
            console.log("User created with ID: ", docRef.id);
            return true;
        })
        .catch((error) => {
            console.error("Error creating user: ", error);
        });
});

exports.deleteUser = functions.auth.user().onDelete((user) => {
    firestore.collection('users').doc(user.uid).delete()
        .then(() => {
            console.log("User deleted");
            return true;
        })
        .catch((error) => {
            console.error("Error deleting user", error);
        });
});