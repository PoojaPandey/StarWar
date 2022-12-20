import React, {useState, useEffect} from 'react';
import style from './style/resultStyle';
import {
  Text,
  View,
  ImageBackground,
  Image,
  Button,
  Alert,
  BackHandler,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {logout} from '../redux/action/auth';
import shared from '../utils/shared';
import {FlatList} from 'react-native-gesture-handler';
import ButtonComponent from './common/buttonComponent';
import * as Constant from '../utils/constant';
import FeedbackQuestionComponent from './common/feedbackQuestionComponent';
import UserInactivity from 'react-native-user-inactivity';

export default function ResultScreen({route, navigation}) {
  const {otherParam} = route.params;
  const [showModel, setShowModel] = useState(false);
  const [totalScore, setTotalScore] = useState('');
  const [active, setActive] = useState(true);
  const [timer] = useState(300000);

  const dispatch = useDispatch();

  useEffect(() => {
    initialSeup();
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  });

  /**
   * initialSeup method to setup navigation bar logout button and calculating tottal score.
   */
  const initialSeup = () => {
    let total = 0;
    otherParam.map(item => {
      if (item.answer === item.correctAnswer) {
        total = total + 1;
      }
    });
    setTotalScore((total / otherParam.length) * 100);
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => logoutPressed()}
          title={Constant.LOGOUT_BUTTON}
          color="black"
        />
      ),
    });
  };

  /**
   * sessionExpried method will be called when user is not active in some time.
   */
  const sessionExpried = () => {
    setActive(false);
    Alert.alert(
      Constant.SESSION_EXPIRED_TITLE,
      Constant.SESSION_EXPIRED_DETAIL,
      [{text: 'OK', onPress: () => confirmLogout()}],
    );
  };

  /**
   * logoutPressed method when login clicked.
   */
  const logoutPressed = () => {
    Alert.alert(Constant.CONFIRMATION, Constant.LOGUT_ALERT_MSG, [
      {text: 'No'},
      {text: 'Yes', onPress: () => confirmLogout()},
    ]);
  };

  /**
   * confirmLogout method for logout confirmation.
   */
  const confirmLogout = () => {
    dispatch(logout()).then(response => {
      if (response.status === 'success') {
        navigation.navigate(Constant.LOGIN_SCREEN);
        let commonData = shared.getInstance();
        commonData.resetData();
      }
    });
  };

  /**
   * goToHomePressed method  when go to hoem pressed.
   */
  const goToHomePressed = () => {
    navigation.navigate(Constant.DASHBOARD_SCREEN, {});
    let commonData = shared.getInstance();
    commonData.resetData();
  };

  /**
   * isCorrectAnswer method to get if selected answer is correct or not.
   * @param item: The answer data
   */
  const isCorrectAnswer = item => {
    if (item.answer === item.correctAnswer) {
      return true;
    }
    return false;
  };

  /**
   * QuestionFeedBack method to show question list with correct and selected answers.
   */
  const QuestionFeedBack = () => {
    if (!showModel) {
      return null;
    } else {
      return (
        <View style={[showModel ? style.overlay : null]}>
          <Button
            style={style.close}
            title={Constant.CLOSE_BUTTON}
            onPress={() => closePressed()}
          />
          <FlatList
            style={style.list}
            data={otherParam}
            renderItem={({item, index}) => (
              <FeedbackQuestionComponent
                item={item}
                isCorrect={isCorrectAnswer(item)}
                index={index}
              />
            )}
          />
        </View>
      );
    }
  };

  /**
   * closePressed method to close the feedback component.
   */
  const closePressed = () => {
    setShowModel(false);
  };

  /**
   * viewFeeedback method to show the feedback of quiz.
   */
  const viewFeeedback = () => {
    setShowModel(true);
  };

  return (
    <View style={style.container}>
      <UserInactivity
        isActive={active}
        timeForInactivity={timer}
        onAction={isActive => {
          if (!isActive) {
            sessionExpried();
          }
        }}>
        <ImageBackground
          resizeMode="cover"
          source={require('../asset/bg5.jpeg')}
          style={style.bgimage}>
          <View style={style.innerContainer}>
            <Image
              style={style.image}
              source={
                totalScore > 50.0
                  ? require('../asset/congrats-14.gif')
                  : require('../asset/sad2.gif')
              }
            />
            <Text style={style.result}>
              {Constant.TOTAL_SCORE} {totalScore}%
            </Text>
            <Button title="View feedback" onPress={() => viewFeeedback()} />
            <ButtonComponent
              onPress={goToHomePressed}
              title={Constant.GO_TO_HOME}
              isDisabled={false}
            />
          </View>
          <QuestionFeedBack />
          {/* <CongratsComponent style={style.overlay} /> */}
        </ImageBackground>
      </UserInactivity>
    </View>
  );
}
