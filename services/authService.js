import AsyncStorage from '@react-native-async-storage/async-storage';
const logIn = async user => {
  const {username, password} = user;
  if (username === 'admin' && password === '12345678') {
    AsyncStorage.setItem('user', JSON.stringify(user));
    return {
      status: 'success',
      message: 'You are redirecting to home page',
      user: username,
    };
  } else {
    return {
      status: 'Failure',
      message: 'Error',
      user: username,
    };
  }
};
const logOut = async () => {
  AsyncStorage.clear();
  return {
    status: 'success',
    message: 'You are logged out',
  };
};

const getUserData = async () => {
  let userdata = AsyncStorage.getItem('user');
  return {
    status: 'success',
    message: 'user data',
    user: userdata,
  };
};

const setResponse = async response => {
  AsyncStorage.setItem('data', JSON.stringify(response));
  return {
    status: 'success',
    message: 'You are redirecting to dashbard page',
    questionData: response,
  };
};

const getResponse = async response => {
  let data = AsyncStorage.getItem('data', JSON.stringify(response));
  return {
    status: 'success',
    message: 'You are redirecting to dashbard page',
    questionData: response,
  };
};

const setLevel = async response => {
  AsyncStorage.setItem('level', JSON.stringify(response));
  return {
    status: 'success',
    message: 'Your level set',
    level: response,
  };
};

const setUserSelectedData = async data => {
  AsyncStorage.setItem('userSelectedData', JSON.stringify(data));
  return {
    status: 'success',
    message: 'user selected data',
    userSelectedData: data,
  };
};
export default {
  logIn,
  logOut,
  getUserData,
  setResponse,
  getResponse,
  setLevel,
  setUserSelectedData,
};
