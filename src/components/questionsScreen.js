import React, {useState, useEffect} from 'react';
import style from './style/questionsStyle';
import {View, ImageBackground} from 'react-native';
import {useSelector} from 'react-redux';
import shared from '../utils/shared';
import {FlatList} from 'react-native-gesture-handler';
import QuestionCardComponent from './common/questionCardComponent';
import ButtonComponent from './common/buttonComponent';
import * as Constant from '../utils/constant';

export default function QuestionsScreen({route, navigation}) {
  const [data, setData] = useState('');
  const [correctAnswer] = useState('');
  const [isSubmitEnable, setIsSubmitEnable] = useState(true);
  const reducer = useSelector(state => state);
  const {auth} = reducer;
  const {questionData} = auth;

  useEffect(() => {
    setData(questionData);
    return () => {
      setData(null);
    };
  }, [data, correctAnswer]);

  /**
   * onPressButton method when we click the submit button
   */
  const onPressButton = () => {
    let commonData = shared.getInstance();
    navigation.navigate(Constant.RESULT_SCREEN, {
      otherParam: commonData.getSelectedQuestion(),
    });
  };

  /**
   * getItem method to get the option of answer.
   * @param item: question and answer data.
   */
  const getItem = item => {
    let options = item.incorrect_answers;
    if (options.includes(item.correct_answer) === false) {
      options.push(item.correct_answer);
    }
    options = options.sort(() => Math.random() - 0.5);
    options = options.map((element, index) => {
      let dataItem = {option: element, isSelected: false};
      return {...dataItem};
    });
    return options;
  };

  /**
   * handleCallback method to get call back when answer selected
   */
  const handleCallback = () => {
    let commonData = shared.getInstance();
    let questionsData = commonData.getSelectedQuestion();
    if (questionsData.length === data.length) {
      setIsSubmitEnable(false);
    }
  };
  return (
    <View style={style.container}>
      <ImageBackground
        resizeMode="cover"
        source={require('../asset/bg5.jpeg')}
        style={style.bgimage}>
        <View style={style.innerContainer}>
          <FlatList
            style={style.list}
            data={data}
            renderItem={({item, index}) => (
              <QuestionCardComponent
                handleCallBack={() => handleCallback()}
                item={item}
                options={getItem(item)}
                index={index}
              />
            )}
          />
          <ButtonComponent
            onPress={onPressButton}
            title={Constant.SUBMIT_BUTTON}
            isDisabled={isSubmitEnable}
          />
        </View>
      </ImageBackground>
    </View>
  );
}
