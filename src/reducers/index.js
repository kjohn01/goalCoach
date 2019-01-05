import { SIGNED_IN } from '../constants';

let user = {
    uid: '',
    email: '',
    goals: []
};

export default (state = user, action) => {
  switch (action.type) {

  case SIGNED_IN:
    const { uid ,email, goals } = action;
    user = { uid, email, goals };
    return user;

  default:
    return state;
  }
}
