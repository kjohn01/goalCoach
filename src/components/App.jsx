import React, { Component } from 'react';
import { connect } from 'react-redux'
import { auth, firestore } from '../firebase';
import { AddGoals, GoalList } from '../components';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.signOut = this.signOut.bind(this);
    }

    signOut() {
        auth.signOut()
            .then(() => {
                firestore.collection('users').doc(this.props.user.uid).update({
                    presence: false
                });
            });
    }

    render() {
        return(
            <div className="frame">
                <h3>GOALS</h3>
                <AddGoals />
                <GoalList />
                <button className="btn btn-danger" onClick={this.signOut}>
                    Sign Out
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

export default connect(mapStateToProps, null)(App)
