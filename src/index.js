import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { App, SignIn, SignUp } from './components';

ReactDOM.render(
    <Router path="/" history={browserHistory}>
        <Route path="app" component={App} />
        <Route path="signin" component={SignIn} />
        <Route path="signup" component={SignUp} />
    </Router>, document.getElementById('root')
);