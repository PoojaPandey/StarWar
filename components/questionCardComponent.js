import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import AnswerComponent from './answerComponent';
import shared from '../shared/shared';

export default function QuestionCardComponent({
  handleCallBack,
  item,
  options,
  index,
}) {
  const [answerOptions, setAnswerOptions] = useState(options);
  const [question, setQuestion] = useState(item.question);
  const [correctAnswer] = useState(item.correct_answer);
  const [commonData] = useState(shared.getInstance());
  const [currentQuestion, setCurrentQuestion] = useState('');

  /**
   * actionOnRow method to select the level option.
   * @param item: Selected answer.
   */
  const actionOnRow = item => {
    let newArray = answerOptions;
    newArray = newArray.map((element, i) => {
      if (element.option === item.option) {
        element.isSelected = true;
      } else {
        element.isSelected = false;
      }
      return element;
    });
    setAnswerOptions(newArray);
    let questionItem = {
      question: question,
      correctAnswer: correctAnswer,
      answer: item.option,
    };
    commonData.setSelectedQuestion(questionItem);
    setCurrentQuestion(questionItem);
    handleCallBack();
  };

  /**
   * renderItem method to to render answer list .
   */
  const renderItem = (option, i) => {
    return (
      <TouchableOpacity
        style={styles.answer}
        onPress={() => actionOnRow(option, i)}>
        <AnswerComponent item={option.option} isSelected={option.isSelected} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.item}>
        Q {index + 1}. {question}
      </Text>
      <FlatList
        style={styles.list}
        data={answerOptions}
        renderItem={({item, index}) => renderItem(item, index)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    padding: 0,
    borderColor: '#4682B4',
    width: '100%',
  },
  item: {
    fontSize: 14,
    margin: 10,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    colo: 'black',
  },
  list: {
    width: '80%',
    marginLeft: 30,
  },
  answer: {
    alignContent: 'center',
  },
  options: {
    fontSize: 14,
    margin: 10,
    fontFamily: 'Arial',
  },
});
