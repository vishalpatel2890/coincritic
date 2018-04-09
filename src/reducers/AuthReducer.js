import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER_FAIL_RESET,
  LOGIN_USER,
  SIGNOUT_USER
} from '../constants/constants';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: null,
  loading: false
};

export const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true, error: null };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };

     case SIGNOUT_USER:
      return { ...state, ...INITIAL_STATE}
    default:
      return state;
  }
};

export const error = (state = null, action) =>{
  switch (action.type) {
  case LOGIN_USER_FAIL:
    return action.payload;
  case LOGIN_USER_FAIL_RESET:
    return state
    default:
    return state;
  }
}
