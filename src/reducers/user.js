import { SIGNED_IN, SIGNED_OUT } from '../constants';

let user = {
    uid: '',
    email: ''
};

export default (state = user, action) => {
  switch (action.type) {

  case SIGNED_IN:
    const { uid ,email } = action;
    user = { uid, email};
    return user;

  case SIGNED_OUT:
    user = {
      uid: '',
      email: ''
    };
    return user;

  default:
    return state;
  }
}
