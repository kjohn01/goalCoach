import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames';
import { firestore } from '../firebase';

export class AddGoals extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newGoal: '',
            error: null
        };
        this.submit = this.submit.bind(this);
    }
    
    submit() {
        console.log('submit this', this);
        const { newGoal } = this.state;
        let { goals } = this.props;
        if (newGoal.length > 0) {
            if (!goals) goals = [newGoal];
            else goals.push(newGoal);
            firestore.collection('users').doc(this.props.uid).update({
                goals
            })
                .then(() => {
                    this.setState({ newGoal: '', error: null });
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                    this.setState({ error });
                });
        }
        else {
            console.error('empty new goal');
            this.setState({
                error: {
                    message: "What is your new goal?"
                }
            })
        }
    }

    render() {
        const { newGoal, error } = this.state;
        const inputClasses = classNames(
            'form-control', error ? 'border-danger' : ''
        );
        if (!this.props.uid) return null;
        return (
            <div className="form-inline">
                <div className="form-group">
                    <input className={inputClasses} 
                        type="text" 
                        value={newGoal}
                        placeholder="add a goal" 
                        onKeyPress={event => {
                            if(event.key === 'Enter') this.submit();
                            else return;
                        }}
                        onChange={event => this.setState({ newGoal: event.target.value })} />
                    <button type="button" 
                        className="btn btn-success"
                        onClick={this.submit} >
                        Submit
                    </button>
                </div>
                {
                    error 
                        ? <h5 className="text-danger">{error.message}</h5>
                        : null
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('add goal state', state);
    const { uid, goals } = state;
    return { uid, goals };
};

export default connect(mapStateToProps, null)(AddGoals)
