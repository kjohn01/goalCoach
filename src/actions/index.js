import { SIGNED_IN } from '../constants';

const logUser = (uid, email, goals) => {
    const action = {
        type: SIGNED_IN,
        uid,
        email, 
        goals 
    };
    return action;
}

export default logUser;