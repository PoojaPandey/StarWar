import {
  LOGIN_SUCCESS,
  LOGOUT,
  GET_QUESTIONLIST,
  GET_QUESTIONLIST_FAIL,
  USER_SELECTED_DATA,
  LEVEL_SAVED,
} from './type';
import AuthService from '../services/authService';
import * as Constant from '../utils/constant';

export const login = (user, password) => dispatch => {
  return AuthService.logIn(user, password).then(
    response => {
      if (response.status === 'success') {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {user: response.user},
        });
        Promise.resolve();
        return response;
      }
    },
    error => {
      const message = error.toString();
      Promise.reject();
      return message;
    },
  );
};
export const logout = () => dispatch => {
  return AuthService.logOut().then(response => {
    if (response.status === 'success') {
      dispatch({
        type: LOGOUT,
      });
      Promise.resolve();
      return response;
    }
  });
};

export const getQuestions = level => dispatch => {
  return fetch(Constant.QUESTIONS_API + level)
    .then(response => response.json())
    .then(response => {
      return AuthService.setResponse(response.results).then(
        resp => {
          if (resp.status === 'success') {
            dispatch({
              type: GET_QUESTIONLIST,
              payload: {questionData: resp.questionData},
            });
            Promise.resolve();
            return resp;
          }
        },
        error => {
          const message = error.toString();
          dispatch({
            type: GET_QUESTIONLIST_FAIL,
          });
          Promise.reject();
          return message;
        },
      );
    })
    .catch(function (error) {
      console.log(
        'There has been a problem with your fetch operation: ' + error.message,
      );
      // ADD THIS THROW error
      throw error;
    });
};

export const getUser = () => dispatch => {
  return AuthService.getUserData().then(response => {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {user: response.user},
    });
    Promise.resolve();
    return response;
  });
};

export const setLevel = data => dispatch => {
  return AuthService.setLevel(data).then(response => {
    if (response.status === 'success') {
      dispatch({
        type: LEVEL_SAVED,
      });
      Promise.resolve();
      return response;
    }
  });
};

export const getUserSelectedData = () => dispatch => {
  return AuthService.setUserSelectedData().then(response => {
    dispatch({
      type: USER_SELECTED_DATA,
    });
    Promise.resolve();
    return response;
  });
};
