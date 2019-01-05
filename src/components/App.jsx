import React, { Component } from 'react';
import { connect } from 'react-redux'
import { auth } from '../firebase';
import { AddGoals } from '../components';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.signOut = this.signOut.bind(this);
    }

    signOut() {
        auth.signOut();
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
  return {};
};

export default connect(mapStateToProps, null)(App)
