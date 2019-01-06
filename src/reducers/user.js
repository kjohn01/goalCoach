import { SIGNED_IN } from '../constants';

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

  default:
    return state;
  }
}
