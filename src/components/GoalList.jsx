import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GoalItem } from '../components';

export class GoalList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: true
    };
    this.toggleExpand = this.toggleExpand.bind(this);
  }

  toggleExpand() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const { goals } = this.props;
    return (
      <div>
        <div>
          <h3>Goals</h3>
          <button className="btn btn-xs" onClick={this.toggleExpand}>
            {
              this.state.expanded 
                ? 'Hide'
                : 'Show'
            }
          </button>
        </div>
        {
            goals.map((goal, index) => <GoalItem key={index} goal={goal} />)
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
