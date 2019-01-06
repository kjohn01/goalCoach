import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firestore } from '../firebase';

export class GoalItem extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.complete = this.complete.bind(this);
    this.remove = this.remove.bind(this);
  }

  static propTypes = {
    index: PropTypes.number.isRequired,
    goal: PropTypes.shape({
        title: PropTypes.string.isRequired,
        dueDate: PropTypes.number.isRequired
    })
  }

  remove() {
    const { user, goal } = this.props;
    const userRef = firestore.collection('users').doc(user.uid);
    userRef.update({
        goals: firestore.FieldValue.arrayRemove(goal)
    })
  }

  complete() {
    const { user } = this.props;
    const userRef = firestore.collection('users').doc(user.uid);
    let { completedGoals, goal } = this.props;
    goal.completeDate = new Date();
    if (!completedGoals) completedGoals = [goal];
    else completedGoals.push(goal);
    userRef.update({
        goals: firestore.FieldValue.arrayRemove(this.props.goal),
        completedGoals
    })
  }

  render() {
    const { goal } = this.props;
    return (
      <div className="">
        <h3>{goal.title}</h3>
        <h4>{new Date(goal.dueDate)}</h4>
        <button className="btn btn-sm btn-primary" onClick={this.complete} >
            Complete
        </button>
        <button className="btn btn-sm btn-secondary" onClick={this.remove} >
            X Remove
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { user, completedGoals } = state;
  return { user, completedGoals };
};

export default connect(mapStateToProps, null)(GoalItem)
