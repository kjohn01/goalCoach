import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCompletedGoals } from '../actions';
import { CompletedGoalItem } from '../components';
import { firestore } from '../firebase';

export class CompletedGoalList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.clear = this.clear.bind(this);
  }

  clear() {
    firestore.collection('users').doc(this.props.user.uid).update({
        completedGoals: []
    });
  }

  render() {
    const { completedGoals } = this.props;
    return (
      <div>
        <h3>Completed Goals</h3>
        {
            completedGoals.map((completedGoal, index) => {
                return <CompletedGoalItem key={index} completedGoal={completedGoal} />
            })
        }
        <button className="btn btn-sm btn-primary" onClick={this.clear}>
            clear
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { user, completedGoals } = state;
  return { user, completedGoals };
};

export default connect(mapStateToProps, { setCompletedGoals })(CompletedGoalList);
