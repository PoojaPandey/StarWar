import React, {useState, useEffect} from 'react';
import style from './dashboardStyle';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {getQuestions, logout, getUser} from './../action/auth';
import shared from '../shared/shared';
import {FlatList} from 'react-native-gesture-handler';
import ButtonComponent from './buttonComponent';
import * as Constant from './../utils/constant';
import AnswerComponent from './answerComponent';

export default function Dashboard({route, navigation}) {
  const {itemId, otherParam} = route.params;
  const [options, setOptions] = useState(Constant.LevelOption);
  const [selectedOption, setSelectedOption] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => logoutPressed()}
          title={Constant.LOGOUT_BUTTON}
          color="black"
        />
      ),
    });
  });

  /**
   * logoutPressed method when logout presses.
   */
  const logoutPressed = () => {
    Alert.alert(Constant.CONFIRMATION, Constant.LOGUT_ALERT_MSG, [
      {text: 'No'},
      {text: 'Yes', onPress: () => confirmLogout()},
    ]);
  };

  /**
   * confirmLogout method to get confirmation for logout the user.
   */
  const confirmLogout = () => {
    dispatch(logout()).then(response => {
      if (response.status === 'success') {
        navigation.navigate(Constant.LOGIN_SCREEN);
      }
    });
  };

  /**
   * onStartPress method to start with the quiz.
   */
  const onStartPress = () => {
    console.log('selectedOption', selectedOption);
    setQuestionsData();
  };

  ///TODO: Need to move in redux
  const setQuestionsData = async () => {

    //REDUX PART:
    dispatch(getQuestions());
    .then(response => {
      console.log('response,,,, =>', response);
    })
    .catch(error => {
      console.log('response,,,,');
      console.log(error);
    });
    console.log('questionData', data);

    // Uncomment for happy flow
   /*
    try {
      const url = Constant.QUESTIONS_API + selectedOption.toLowerCase();
      console.log(url);
      const response = await fetch(url);
      const json = await response.json();
      console.log(json.results);
      let commonData = shared.getInstance();
      commonData.setQuestionData(json.results);
      navigation.navigate(Constant.QUESTIONS_SCREEN, {
        itemId: itemId,
        otherParam: 'anything you want here',
      });
    } catch (error) {
      console.log('error');
      console.error(error);
    }
   */
  };

    /**
   * actionOnRow method to select the level option.
   * @param item: Selected item.
   */
  const actionOnRow = async (item) => {
    let newArray = options;
    newArray = newArray.map((element, i) => {
      if (element.item === item) {
        element.isSelected = true;
        setSelectedOption(element.item);
      } else {
        element.isSelected = false;
      }
      return element;
    });
    setOptions(newArray);
    setSelectedOption(item);
  };

  return (
    <View style={style.container}>
      <ImageBackground
        resizeMode="cover"
        source={require('../asset/bg4.jpeg')}
        style={style.bgimage}>
        <View style={style.innerContainer}>
          <Text style={style.welcome}>Welcome {otherParam} !</Text>
          <Text style={style.title}>Please select difficulty level!</Text>
          <FlatList
            style={style.list}
            data={options}
            renderItem={({item, index}) => (
              <TouchableOpacity onPress={() => actionOnRow(item.item)}>
                <AnswerComponent
                  item={item.item}
                  isSelected={item.isSelected}
                />
              </TouchableOpacity>
            )}
          />
          <ButtonComponent
            onPress={onStartPress}
            title={Constant.START_BUTTON}
            isDisabled={selectedOption === '' ? true : false}
          />
        </View>
      </ImageBackground>
    </View>
  );
}
