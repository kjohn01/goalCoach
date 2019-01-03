import React, { Component } from 'react';
import { firebaseApp } from '../firebase';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.signOut = this.signOut.bind(this);
    }

    signOut() {
        firebaseApp.auth().signOut();
    }

    render() {
        return(
            <div className="frame">
                <button className="btn btn-danger" onClick={this.signOut}>
                    Sign Out
                </button>
            </div>
        );
    }
}

export default App;