import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux'; 
import { Router, Route, browserHistory } from 'react-router';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import reducer from './reducers';
import { logUser, logOut, setGoals, setCompletedGoals } from './actions';
import { auth, firestore } from './firebase';
import { App, SignIn, SignUp } from './components';
import './index.css';

const store = createStore(reducer);

auth.onAuthStateChanged(user => {
    if (user) {
        const { uid, email } = user;
        const userRef = firestore.collection('users').doc(uid);
        const goals = read_cookie('goals');
        const completedGoals = read_cookie('completedGoals');
        const cookie_uid = read_cookie('uid');
        const cookie_email = read_cookie('email');

        store.dispatch(logUser(uid, email));

        if (uid === cookie_uid) {
            store.dispatch(setGoals(goals));
            store.dispatch(setCompletedGoals(completedGoals));
            if (email !== cookie_email) bake_cookie('email', email);
        }
        else bake_cookie('uid', uid);
            
        userRef.set({
            presence: true,
            email
        }, {
            merge: true
        }).then(() => {
            userRef.onSnapshot((doc) => {
                let { goals, completedGoals } = doc.data();
                if (!goals) goals = [];
                if (!completedGoals) completedGoals = [];
                store.dispatch(setGoals(goals));
                bake_cookie('goals', goals);
                store.dispatch(setCompletedGoals(completedGoals));
                bake_cookie('completedGoals', completedGoals);
            });
        })
        browserHistory.push('app');
    }
    else {
        const unsubscribe = firestore.collection('users').onSnapshot(() => {});
        delete_cookie('uid');
        delete_cookie('email');
        delete_cookie('goals');
        delete_cookie('completedGoals');
        unsubscribe();
        store.dispatch(logOut());
        browserHistory.replace('signin');
    }
});

ReactDOM.render(
    <Provider store={store}>
        <Router path="/" history={browserHistory} className="frame">
            <Route path="app" component={App} />
            <Route path="signin" component={SignIn} />
            <Route path="signup" component={SignUp} />
        </Router>
    </Provider>, document.getElementById('root')
);