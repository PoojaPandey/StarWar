import AsyncStorage from '@react-native-async-storage/async-storage';
const logIn = async user => {
  console.log('user info', user);
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
export default {
  logIn,
  logOut,
  getUserData,
  setResponse,
};

const getUserData = async () => {
  let userdata = AsyncStorage.getItem('user');
  return {
    status: 'success',
    user: userdata,
  };
};

const setResponse = async response => {
  console.log('setResponse');
  console.log(response);
  AsyncStorage.setItem('data', JSON.stringify(response));
  return {
    status: 'success',
    message: 'You are redirecting to dashbard page',
  };
};

const getResponse = async response => {
  return AsyncStorage.getItem('data', JSON.stringify(response));
};
