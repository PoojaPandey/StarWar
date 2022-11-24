import {
  LOGIN_SUCCESS,
  LOGOUT,
  DATASAVED,
  FETCHDATA,
  GET_QUESTIONLIST,
  GET_QUESTIONLIST_FAIL,
  GET_USER,
} from './type';
import AuthService from '../services/authService';
import * as Constant from '../utils/constant';
import {Alert} from 'react-native';

export const login = user => dispatch => {
  return AuthService.logIn(user).then(
    response => {
      console.log('response.status');
      console.log(response.status);
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

export const getQuestions = level => {
  console.log(' getQuestions return');

  return dispatch => {
    console.log(' getQuestions inside return');

    // try {
    // async dispatch => {
    console.log(' async dispatch');

    // Alert.alert('Hello');

    fetch('https://opentdb.com/api.php?amount=10&difficulty=easy', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
        .then(response => response.json())
        .then(data => console.log(data)),
    });

    // const result = fetch(Constant.QUESTIONS_API + level, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
    // const json = result.json();
    // console.log(' result.json');
    // AuthService.setResponse(json.result).then(
    //   response => {
    //     console.log(' setData response');
    //     console.log(response);
    //     if (response.status === 'success') {
    //       dispatch({
    //         type: GET_QUESTIONLIST,
    //         data: json.result,
    //       });
    //       Promise.resolve();
    //       return response;
    //     }
    //   },
    //   error => {
    //     const message = error.toString();
    //     Promise.reject();
    //     console.log('message ->', message);
    //     dispatch({
    //       type: GET_QUESTIONLIST_FAIL,
    //       data: json.result,
    //     });
    //     // return message;
    //   },
    // );
    // };
    // } catch (error) {
    //   console.log(error);
    // }
  };
};

export const getUser = () => dispatch => {
  return AuthService.getUserData().then(
    response => {
      dispatch({
        type: GET_USER,
        payload: {user: response.user},
      });
      Promise.resolve();
      return response;
    },
    error => {
      const message = error.toString();
      Promise.reject();
      return message;
    },
  );
};

/*
export const setData = data => dispatch => {
  console.log(' setData');
  return AuthService.setResponse(data).then(response => {
    console.log(' setData response');
    console.log(response);
    if (response.status === 'success') {
      dispatch({
        type: DATASAVED,
        user: data,
      });
      Promise.resolve();
      return response;
    }
  });
};

export const getData = () => dispatch => {
  return AuthService.getResponse().then(response => {
    dispatch({
      type: FETCHDATA,
    });
    Promise.resolve();
    return response;
  });
};
*/
