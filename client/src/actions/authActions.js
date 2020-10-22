import axios from "axios";
import { returnErrors } from "./errorActions";
import {
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  USER_LOADING,
} from "./types";

//check token & load user

export const loadUser = () => (dispatch, getState) => {
  //user loading
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

//logout user
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

//Register user

export const register = ({ name, email, password }) => (dispatch) => {
  //headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  //request body
  const body = JSON.stringify({ name, email, password });

  axios
    .post("api/user", body, config)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

//login user
export const login = ({ email, password }) => (dispatch) => {
  //headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  //request body
  const body = JSON.stringify({ email, password });

  axios
    .post("api/auth", body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

//setup config/headers and token

export const tokenConfig = (getState) => {
  //get token from loacalstorage
  const token = getState().auth.token;

  //headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  //if token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
};
