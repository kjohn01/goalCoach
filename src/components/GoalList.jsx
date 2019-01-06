import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { firestore } from '../firebase';
import { setGoals } from '../actions';

export class GoalList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { goals } = this.props;
    return (
      <div>
        {
            goals.map(goal => {
                return <h5 key={goals.indexOf(goal)}>{goal}</h5>
            })
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { user, goals } = state;
  return { user, goals };
};

export default connect(mapStateToProps, { setGoals })(GoalList);
