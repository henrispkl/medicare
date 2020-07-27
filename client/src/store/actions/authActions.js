import API from '../../utils/API';
import { clearErrors, returnErrors } from './errorActions';

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from './types';

// Check token and load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  API.get('/users/auth', tokenConfig(getState().auth))
    .then((res) => dispatch({ type: USER_LOADED, payload: res.data }))
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: AUTH_ERROR });
    });
};

// Register user
export const register = ({ name, email, password }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      ContentType: 'application/json',
    },
  };

  // Request body
  const body = JSON.stringify({ name, email, password });

  API.post('/users/register', body, config)
    .then((res) => dispatch({ type: REGISTER_SUCCESS, payload: res.data }))
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
      );
      dispatch({ type: REGISTER_FAIL });
    });
};

// Login user
export const login = ({ email, password }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      ContentType: 'application/json',
    },
  };

  // Request body
  const body = JSON.stringify({ email, password });

  API.post('/users/login', body, config)
    .then((res) => {
      dispatch(clearErrors());
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
      );
      dispatch({ type: LOGIN_FAIL });
    });
};

// Logout user
export const logout = () => (dispatch) => {
  dispatch(clearErrors());
  dispatch({ type: LOGOUT_SUCCESS });
};

// Setup config/header and token
export const tokenConfig = (authState) => {
  // Get token from localStorage
  const token = authState.token;

  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  // If there's a token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};
