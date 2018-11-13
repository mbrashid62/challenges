import axios from 'axios';

export const AUTH_ACTION_TYPES = {
  LOGIN: {
    ATTEMPT: 'LOGIN_ATTEMPT',
    SUCCESS: 'LOGIN_SUCCESS',
    FAILURE: 'LOGIN_FAILURE',
  },
  LOGOUT: 'LOGOUT',
  SET_USER: 'SET_USER',
  // Todo: add registration types below
};

export function dispatchLoginAttempt(email, password) {
  return (dispatch) => {
    dispatch({
      type: AUTH_ACTION_TYPES.LOGIN.ATTEMPT,
      payload: {
        email,
        password,
      },
    });

    axios.post('api/auth/login', {
      email,
      password,
    })
      .then((response) => (
        dispatch({
          type: AUTH_ACTION_TYPES.LOGIN.SUCCESS,
          payload: response.data,
        })
      ))
      .catch((err) => (
        dispatch({
          type: AUTH_ACTION_TYPES.LOGIN.FAILURE,
          payload: { ...err },
        })
      ));
  };
}

export function dispatchLogout() {
  return {
    type: AUTH_ACTION_TYPES.LOGOUT,
  };
}
