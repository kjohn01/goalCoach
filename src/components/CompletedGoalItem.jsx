import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firestore } from '../firebase';

export class GoalItem extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.remove = this.remove.bind(this);
  }

  static propTypes = {
    index: PropTypes.number.isRequired,
    completedGoal: PropTypes.shape({
        title: PropTypes.string.isRequired,
        completedDate: PropTypes.number.isRequired
    })
  }

  remove() {
    const { user, completedGoal } = this.props;
    const userRef = firestore.collection('users').doc(user.uid);
    userRef.update({
        completedGoals: firestore.FieldValue.arrayRemove(completedGoal)
    })
  }

  render() {
    const { completedGoal } = this.props;
    return (
      <div className="">
        <h3>{completedGoal.title}</h3>
        <h4>{new Date(completedGoal.completedDate)}</h4>
        <button className="btn btn-sm btn-primary" onClick={this.remove} >
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
