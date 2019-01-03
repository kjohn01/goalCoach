import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { firebaseApp } from './firebase';
import { App, SignIn, SignUp } from './components';
import './index.css';

firebaseApp.auth().onAuthStateChanged(user => {
    if (user) {
        console.log('user presented');
        
    }
    else {
        console.log('no active user');
        
    }
});

ReactDOM.render(
    <Router path="/" history={browserHistory} className="frame">
        <Route path="app" component={App} />
        <Route path="signin" component={SignIn} />
        <Route path="signup" component={SignUp} />
    </Router>, document.getElementById('root')
);