import React, { Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { auth } from '../firebase';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: {}
        };
        this.signUp = this.signUp.bind(this);
    }

    signUp() {
        const { email, password } = this.state;
        auth.createUserWithEmailAndPassword(email, password).catch(error => this.setState({error}));
    }

    render() {
        if (this.props.user.uid !== '') browserHistory.replace('app');
        const classes = classNames(
            'form-control', this.state.error.message ? 'border-danger' : ''
        );
        return(
            <div className="form-inline frame">
                <h2>Sign Up</h2>
                <div className="form-group">
                    <input className={classes}
                        type="email"
                        placeholder="email"
                        onChange={event => this.setState({email: event.target.value})}
                    />
                    <input className={classes}
                        type="password"
                        placeholder="password"
                        onChange={event => this.setState({password: event.target.value})}
                    />
                    <button className="btn btn-primary" type="button"
                        onClick={this.signUp}>
                        Go
                    </button>
                </div>
                <h3 className="text-danger">{this.state.error.message}</h3>
                <h4>Already has an account?</h4>
                <Link to="/signin">Sign In instead</Link>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { user } = state;
    return { user };
};

export default connect(mapStateToProps, null)(SignUp);