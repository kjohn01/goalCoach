import React, { Component } from 'react';
import { connect } from 'react-redux'
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

const mapStateToProps = (state) => {
  console.log('state', state);
  return {};
};

const mapDispatchToProps = {
  
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
