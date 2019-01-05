import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux'; 
import { Router, Route, browserHistory } from 'react-router';
import reducer from './reducers';
import logUser from './actions';
import { firebaseApp } from './firebase';
import { App, SignIn, SignUp } from './components';
import './index.css';


const store = createStore(reducer);

firebaseApp.auth().onAuthStateChanged(user => {
    if (user) {
        const { email } = user;
        store.dispatch(logUser(email));
        console.log('user presented');
        browserHistory.push('app');
    }
    else {
        console.log('no active user');
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