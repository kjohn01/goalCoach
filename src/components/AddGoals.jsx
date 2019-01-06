import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames';
import { firestore } from '../firebase';

const initialState = {
    title: '',
    dueDate: 0,
    error: null,
    titleError: null,
    dueDateError: null
};

export class AddGoals extends Component {
    constructor(props) {
        super(props);
        this.state = { ...initialState };
        this.submit = this.submit.bind(this);
        this.checkNewGoal = this.checkNewGoal.bind(this);
    }

    checkNewGoal(newGoal) {
        const now = new Date();
        const isTitleValid = newGoal.title.length > 0;
        const isDueDateValid = newGoal.dueDate - now > 0;
        if (!isTitleValid) this.setState({ 
            titleError: 'What is your new goal?'
        })
        if (!isDueDateValid) this.setState({
            dueDateError: 'plz select someday in the future'
        })
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
        const { title, dueDate, error, titleError, dueDateError } = this.state;
        const inputClasses = classNames(
            'form-control', error || titleError ? 'border-danger' : ''
        );
        const calendarClasses = classNames(
            'form-control', error || dueDateError ? 'border-danger' : ''
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
                            if(event.key === 'Enter') this.submit();
                            else return;
                        }}
                        onChange={event => this.setState({ title: event.target.value })} />
                    <h5>{titleError}</h5>
                    <input className={calendarClasses} 
                        type="calendar" 
                        value={dueDate}
                        placeholder="add a goal" 
                        onKeyPress={event => {
                            if(event.key === 'Enter') this.submit();
                            else return;
                        }}
                        onChange={event => this.setState({ dueDate: event.target.value })} />
                    <h5>{dueDateError}</h5>
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
