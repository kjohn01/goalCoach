import { SIGNED_IN, SIGNED_OUT, SET_GOALS, SET_COMPELETD_GOALS } from '../constants';

export const logUser = (uid, email) => {
    const action = {
        type: SIGNED_IN,
        uid,
        email 
    };
    return action;
};

export const logOut = () => {
    const action = {
        type: SIGNED_OUT,
        uid: '',
        email: ''
    };
    return action;
};

export const setGoals = (goals) => {
    const action = {
        type: SET_GOALS,
        goals
    };
    return action;
};

export const setCompletedGoals = (completedGoals) => {
    const action = {
        type: SET_COMPELETD_GOALS,
        completedGoals
    };
    return action;
};