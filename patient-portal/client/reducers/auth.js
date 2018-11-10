import { AUTH_ACTION_TYPES } from '../actions/auth';

const API_STATUS = {
  IDLE: 'IDLE',
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
};

const AUTH_STATE = {
  user: {},
  status: API_STATUS.IDLE,
};

const authReducer = (state = AUTH_STATE, action) => {
  switch (action.type) {
    case AUTH_ACTION_TYPES.LOGIN.ATTEMPT:
      return {
        ...state,
        status: API_STATUS.PENDING,
      };
    case AUTH_ACTION_TYPES.LOGIN.SUCCESS: {
      return {
        ...state,
        user: action.payload,
        status: API_STATUS.SUCCESS,
      };
    }
    case AUTH_ACTION_TYPES.LOGIN.FAILURE: {
      return {
        ...state,
        user: {},
        status: API_STATUS.LOGIN.FAILURE,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
