import {StyleSheet} from 'react-native';

const LoginStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  bgimage: {
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden',
    alignItems: 'center',
  },
  innerContainer: {
    width: '80%',
    height: '50%',
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 10,
    alignItems: 'center',
  },

  inputView: {
    backgroundColor: '#ADD8E6',
    borderRadius: 30,
    opacity: 0.9,
    height: 45,
    marginBottom: 20,
    justifyContent: 'center',
    width: '80%',
    paddingLeft: 20,
    paddingRight: 20,
  },

  textInput: {
    height: 50,
    flex: 1,
    alignItems: 'center',
  },
  loginBtn: {
    marginBottom: 20,
  },
  image: {
    width: '60%',
    height: '30%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  loginText: {
    color: 'black',
    fontStyle: 'normal',
    fontWeight: 'bold',
  },
  signInStyle: {
    color: '#FF0000',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 50,
    fontFamily: 'Arial',
    marginBottom: 20,
  },
});

export default LoginStyle;
