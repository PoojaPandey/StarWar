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
import {useDispatch, useSelector} from 'react-redux';
import {getQuestions, getUser, logout} from './../action/auth';
import {FlatList} from 'react-native-gesture-handler';
import ButtonComponent from './buttonComponent';
import * as Constant from './../utils/constant';
import AnswerComponent from './answerComponent';

export default function Dashboard({route, navigation}) {
  const {itemId} = route.params;
  const [options, setOptions] = useState(
    JSON.parse(JSON.stringify(Constant.LevelOption)),
  );
  const [selectedOption, setSelectedOption] = useState('');
  const reducer = useSelector(state => state);
  const {auth} = reducer;
  const {user} = auth;
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
        setOptions(JSON.parse(JSON.stringify(Constant.LevelOption)));
        setSelectedOption('');
      }
    });
  };

  /**
   * onStartPress method to start with the quiz.
   */
  const onStartPress = () => {
    setQuestionsData();
  };

  /**
   * setQuestionsData method to get question data from api and set to REDUX.
   */
  const setQuestionsData = async () => {
    //REDUX PART:
    dispatch(getQuestions(selectedOption.toLowerCase()))
      .then(response => {
        console.log(' setQuestionsData response,,,, =>', response);
        if (response.status === 'success') {
          navigation.navigate(Constant.QUESTIONS_SCREEN, {
            itemId: itemId,
            otherParam: 'anything you want here',
          });
          setOptions(JSON.parse(JSON.stringify(Constant.LevelOption)));
          setSelectedOption('');
        }
      })
      .catch(error => {
        console.log('response,,,,');
        console.log(error);
      });
  };

  /**
   * actionOnRow method to select the level option.
   * @param item: Selected item.
   */
  const actionOnRow = async item => {
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
          <Text style={style.welcome}>Welcome {user} !</Text>
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
