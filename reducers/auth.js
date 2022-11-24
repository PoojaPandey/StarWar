import {
  LOGIN_SUCCESS,
  LOGOUT,
  DATASAVED,
  FETCHDATA,
  GET_QUESTIONLIST,
  GET_QUESTIONLIST_FAIL,
  GET_USER,
} from './../action/type';
import AsyncStorage from '@react-native-async-storage/async-storage';
const user = AsyncStorage.getItem('user');
const questionData = AsyncStorage.getItem('data');
const initialState = user
  ? {isLoggedIn: true, user, questionData: null}
  : {isLoggedIn: false, user: null, questionData: null};
export const auth = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
        data: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        data: null,
      };
    case DATASAVED:
      console.log(payload.data);
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
        data: payload.questionData,
      };
    case FETCHDATA:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
        data: payload.questionData,
      };
    case GET_QUESTIONLIST:
      return {
        ...state,
        isLoggedIn: true,
        // user: payload.user,
        data: payload.questionData,
      };
    case GET_QUESTIONLIST_FAIL:
      return {
        ...state,
        isLoggedIn: true,
        data: null,
      };

    case GET_USER:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
        data: null,
      };
    default:
      return state;
  }
};
