import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

export const registerUser = (userData, history) => dispatch => {
  axios
    .post("https://morning-fjord-39504.herokuapp.com/users/register", userData)
    .then(res => history.push("https://morning-fjord-39504.herokuapp.com/verify"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const verifyUser = (userData, history) => dispatch => {
  axios
    .post("https://morning-fjord-39504.herokuapp.com/users/verify", userData)
    .then(res => history.push("https://morning-fjord-39504.herokuapp.com/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
export const GenerateOtp = (userData, history) => dispatch => {
  axios
    .post("https://morning-fjord-39504.herokuapp.com/users/generate", userData)
    .then(res => history.push("https://morning-fjord-39504.herokuapp.com/update"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
export const updatepass = (userData, history) => dispatch => {
  axios
    .post("https://morning-fjord-39504.herokuapp.com/users/update", userData)
    .then(res => history.push("https://morning-fjord-39504.herokuapp.com/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
export const loginUser = userData => dispatch => {
  axios
    .post("https://morning-fjord-39504.herokuapp.com/users/login", userData)
    .then(res => {
      // Save to localStorage

      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};


export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
