import {
  LOGIN_SUCCESS,
  LOGOUT,
  DATASAVED,
  FETCHDATA,
  GET_QUESTIONLIST,
  GET_QUESTIONLIST_FAIL,
  USER_SELECTED_DATA,
  LEVEL_SAVED,
} from './../action/type';
const initialState = {
  user: '',
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
        user: payload.user,
        questionData: null,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        questionData: null,
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
