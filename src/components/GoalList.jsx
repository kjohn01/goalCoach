import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GoalItem } from '../components';

export class GoalList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { goals } = this.props;
    return (
      <div>
        <h3>Goals</h3>
        {
            goals.map((goal, index) => {
                return <GoalItem key={index} goal={goal} />
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

export default connect(mapStateToProps, null)(GoalList);
