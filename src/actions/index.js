import { SIGNED_IN } from '../constants';

const logUser = (email) => {
    const action = {
        type: SIGNED_IN,
        email 
    };
    return action;
}

export default logUser;