import React, {useState} from 'react';
import style from './style/loginStyle';
import {
  Text,
  View,
  TextInput,
  ImageBackground,
  Platform,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {login} from '../redux/action/auth';

import * as ErrorConstants from '../utils/errorConstant';
import * as Constant from '../utils/constant';
import shared from '../utils/shared';
import ButtonComponent from './common/buttonComponent';

export default function Login({navigation}) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loginEnable, setLoginEnable] = useState(false);

  const dispatch = useDispatch();

  /**
   * To check succesfull response.
   */
  const successCall = () => {
    navigation.navigate(Constant.DASHBOARD_SCREEN);
    setUserName('');
    setPassword('');
    setLoginEnable(false);
  };

  /**
   * onUserNameTextChange method to set username.
   *  @param: username text
   */
  const onUserNameTextChange = text => {
    setUserName(text);
    validation();
  };

  /**
   * onPasswordTextChange method to set password.
   * @param: password text
   */
  const onPasswordTextChange = text => {
    setPassword(text);
    validation();
  };

  /**
   * Validation method to validate the user and password.
   */
  const validation = () => {
    if (
      userName.length === Constant.MIN_VALID_LENGTH ||
      password.length === Constant.MIN_VALID_LENGTH
    ) {
      setLoginEnable(false);
    } else {
      setLoginEnable(true);
    }
  };

  /**
   * checkUserValidity method to validate the user and password is correct or not.
   */
  const checkUserValidity = () => {
    let user = {
      username: userName,
      password: password,
    };
    dispatch(login(userName, password))
      .then(response => {
        if (response.status === 'success') {
          successCall();
        }
      })
      .catch(error => {
        Alert.alert(ErrorConstants.ERROR_INVALID_INPUT);
      });
  };

  /**
   * Handlle button click even of Login button.
   */
  const handleLoginPress = () => {
    checkUserValidity();
  };

  return (
    <KeyboardAvoidingView
      style={style.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <ImageBackground
        resizeMode="cover"
        source={require('../asset/bg3.jpeg')}
        style={style.bgimage}>
        <View style={style.innerContainer}>
          <Text style={style.signInStyle}>Sign In</Text>
          <View style={style.inputView}>
            <TextInput
              style={style.textInput}
              placeholder={Constant.USERNAME_PLACEHOLDER}
              placeholderTextColor="#003f5c"
              value={userName}
              onChangeText={text => onUserNameTextChange(text)}
            />
          </View>
          <View style={style.inputView}>
            <TextInput
              style={style.textInput}
              placeholder={Constant.PASSWORD_PLACEHOLDER}
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              value={password}
              onChangeText={text => onPasswordTextChange(text)}
            />
          </View>
          <ButtonComponent
            style={style.loginBtn}
            onPress={handleLoginPress}
            title={Constant.LOGIN_BUTTON}
            isDisabled={!loginEnable}
          />
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}
