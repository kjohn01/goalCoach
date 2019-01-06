import { SIGNED_IN, SET_GOALS } from '../constants';

export const logUser = (uid, email) => {
    const action = {
        type: SIGNED_IN,
        uid,
        email 
    };
    return action;
}

export const setGoals = (goals) => {
    const action = {
        type: SET_GOALS,
        goals
    };
    return action;
}