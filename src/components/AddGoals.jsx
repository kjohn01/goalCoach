import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames';
import { firestore } from '../firebase';
import { isNonEmptyString, isValidDate } from '../utilities';

const initialState = {
    title: '',
    dueDate: 0,
    error: null,
    isTitleValid: true,
    isDueDateValid: true
};

export class AddGoals extends Component {
    constructor(props) {
        super(props);
        this.state = { ...initialState };
        this.submit = this.submit.bind(this);
        this.checkNewGoal = this.checkNewGoal.bind(this);
    }

    checkNewGoal(newGoal) {
        const isTitleValid = isNonEmptyString(newGoal.title);
        const isDueDateValid = isValidDate(newGoal.dueDate);
        this.setState({ isTitleValid, isDueDateValid });
        return isTitleValid && isDueDateValid;
    }
    
    submit() {
        const { title, dueDate } = this.state;
        const newGoal = { title, dueDate };
        let { goals } = this.props;
        if (this.checkNewGoal(newGoal)) {
            if (!goals) goals = [newGoal];
            else goals.push(newGoal);
            firestore.collection('users').doc(this.props.user.uid).update({
                goals
            })
                .then(() => {
                    this.setState({ ...initialState });
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                    this.setState({ error });
                });
        }
    }

    render() {
        const { 
            title, 
            dueDate, 
            error, 
            isTitleValid, 
            isDueDateValid 
        } = this.state;

        const inputClasses = classNames(
            'form-control', error || !isTitleValid ? 'border-danger' : ''
        );
        const calendarClasses = classNames(
            'form-control', error || !isDueDateValid ? 'border-danger' : ''
        );

        if (!this.props.user) return null;

        return (
            <div className="form-inline">
                <div className="form-group">
                    <input className={inputClasses} 
                        type="text" 
                        value={title}
                        placeholder="add a goal" 
                        onKeyPress={event => {
                            if (event.key === 'Enter') this.submit();
                        }}
                        onChange={event => this.setState({ title: event.target.value })} />
                    {
                        !isTitleValid && <h5>What is your new goal?</h5>
                    }

                    <input className={calendarClasses} 
                        type="datetime-local" 
                        value={dueDate}
                        onKeyPress={event => {
                            if (event.key === 'Enter') this.submit();
                        }}
                        onChange={event => this.setState({ dueDate: event.target.value })} />
                    {
                        !isDueDateValid && <h5>plz select someday in the future</h5>
                    }
                    
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
    const { user, goals } = state;
    return { user, goals };
};

export default connect(mapStateToProps, null)(AddGoals)
