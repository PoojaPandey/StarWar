import React, {useState, useEffect} from 'react';
import style from './resultStyle';
import {Text, View, ImageBackground, Image, Button, Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {logout} from './../action/auth';
import shared from '../shared/shared';
import {FlatList} from 'react-native-gesture-handler';
import ButtonComponent from './buttonComponent';
import * as Constant from './../utils/constant';
import AnswerComponent from './answerComponent';
import FeedbackQuestionComponent from './feedbackQuestionComponent';
import CongratsComponent from './congratsComponent';

export default function ResultScreen({route, navigation}) {
  const {itemId, otherParam} = route.params;
  const [data, setData] = useState('');
  const [options, setOptions] = useState(Constant.LevelOption);
  const [selectedOption, setSelectedOption] = useState('');
  const [showModel, setShowModel] = useState(false);
  const [totalScore, setTotalScore] = useState('');

  const dispatch = useDispatch();

  console.log('route.params', route.params);
  console.log(itemId);

  useEffect(() => {
    initialSeup();
  }, [otherParam, totalScore, navigation]);

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
      }
    });
  };

  /**
   * goToHomePressed method  when go to hoem pressed.
   */
  const goToHomePressed = () => {
    let common = shared.getInstance();
    let user = common.getUser();
    navigation.navigate(Constant.DASHBOARD_SCREEN, {
      otherParam: user.username,
    });
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
            title="close"
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
          <Text style={style.result}>Total Score: {totalScore}%</Text>
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
    </View>
  );
}
