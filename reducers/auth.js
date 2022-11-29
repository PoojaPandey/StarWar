import {
  LOGIN_SUCCESS,
  LOGOUT,
  DATASAVED,
  FETCHDATA,
  GET_QUESTIONLIST,
  GET_QUESTIONLIST_FAIL,
  GET_USER,
  USER_SELECTED_DATA,
  LEVEL_SAVED,
} from './../action/type';
import AsyncStorage from '@react-native-async-storage/async-storage';
const user = AsyncStorage.getItem('user');
const userSelectedData = AsyncStorage.getItem('userSelectedData');
const initialState = user
  ? {
      isLoggedIn: true,
      user,
      questionData: null,
      level: null,
      userSelectedData,
    }
  : {
      isLoggedIn: false,
      user: null,
      questionData: null,
      level: null,
      userSelectedData: null,
    };
export const auth = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
        questionData: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        questionData: null,
      };
    case DATASAVED:
      console.log(payload.data);
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
        questionData: payload.questionData,
      };
    case FETCHDATA:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
        questionData: payload.questionData,
      };
    case GET_QUESTIONLIST:
      return {
        ...state,
        isLoggedIn: true,
        questionData: payload.questionData,
      };
    case GET_QUESTIONLIST_FAIL:
      return {
        ...state,
        isLoggedIn: true,
        data: null,
      };

    case LEVEL_SAVED:
      return {
        ...state,
        isLoggedIn: true,
        level: payload.level,
      };
    case USER_SELECTED_DATA:
      return {
        ...state,
        isLoggedIn: true,
        userSelectedData: payload.userSelectedData,
      };
    default:
      return state;
  }
};
