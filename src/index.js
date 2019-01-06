import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux'; 
import { Router, Route, browserHistory } from 'react-router';
import reducer from './reducers';
import { logUser, setGoals } from './actions';
import { auth, firestore } from './firebase';
import { App, SignIn, SignUp } from './components';
import './index.css';


const store = createStore(reducer);

auth.onAuthStateChanged(user => {
    if (user) {
        const { uid, email } = user;
        const userRef = firestore.collection('users').doc(uid);
        userRef.set({
            presence: true,
            email
        }, {
            merge: true
        }).then(() => {
            userRef.onSnapshot((doc) => {
                const { goals } = doc.data();
                store.dispatch(logUser(uid, email));
                store.dispatch(setGoals(goals));
            })
            
        })
        browserHistory.push('app');
    }
    else {
        const unsubscribe = firestore.collection('users').onSnapshot(() => {});
        unsubscribe();
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