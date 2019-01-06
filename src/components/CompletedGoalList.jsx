import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CompletedGoalItem } from '../components';
import { firestore } from '../firebase';

export class CompletedGoalList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: true
    };
    this.clear = this.clear.bind(this);
    this.toggleExpand = this.toggleExpand.bind(this);
  }

  clear() {
    firestore.collection('users').doc(this.props.user.uid).update({
        completedGoals: []
    });
  }

  toggleExpand() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const { completedGoals } = this.props;
    return (
      <div>
        <div>
          <h3>Completed Goals</h3>
          <button className="btn btn-xs" onClick={this.toggleExpand}>
            {
              this.state.expanded 
                ? 'Hide'
                : 'Show'
            }
          </button>
        </div>
        {
            completedGoals.map((completedGoal, index) => <CompletedGoalItem key={index} completedGoal={completedGoal} />)
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

export default connect(mapStateToProps, null)(CompletedGoalList);
