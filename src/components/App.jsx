import React, { Component } from 'react';
import { connect } from 'react-redux'
import { auth, firestore } from '../firebase';
import { AddGoals } from '../components';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.signOut = this.signOut.bind(this);
    }

    signOut() {
        auth.signOut()
            .then(() => {
                firestore.collection('users').doc(this.props.uid).update({
                    presence: false
                });
            });
    }

    render() {
        return(
            <div className="frame">
                <h3>GOALS</h3>
                <AddGoals />
                <div>Goal list</div>
                <button className="btn btn-danger" onClick={this.signOut}>
                    Sign Out
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
  console.log('app state', state);
  const { uid } = state;
  return { uid };
};

export default connect(mapStateToProps, null)(App)
