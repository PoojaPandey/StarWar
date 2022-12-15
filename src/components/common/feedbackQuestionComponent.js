import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

export default function feedbackQuestionComponent({item, isCorrect, index}) {
  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <Image
          style={styles.image}
          source={
            isCorrect
              ? require('../../asset/right1.png')
              : require('../../asset/wrong2.png')
          }
        />
        <View style={[styles.innerContainer]}>
          <Text style={styles.item}>
            Q{index + 1}. {item.question}
          </Text>
          <Text style={styles.answer}>Answer: {item.correctAnswer}</Text>
          <Text style={styles.answer}>Selected Answer: {item.answer}</Text>
        </View>
      </View>
      <View style={styles.seprator} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upperContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 10,
    marginRight: 10,
    borderColor: '#4682B4',
    paddingVertical: 5,
    alignItems: 'flex-start',
  },
  item: {
    fontSize: 14,
    margin: 10,
    fontFamily: 'Arial',
    color: 'black',
    fontWeight: 'bold',
  },
  image: {
    width: 20,
    height: 20,
    marginTop: 15,
  },
  shadowProp: {
    shadowOffset: {width: -2, height: 4},
    shadowColor: 'red',
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  seprator: {
    backgroundColor: '#4682B4',
    width: '100%',
    height: 2,
    margin: 10,
  },
  answer: {
    fontSize: 14,
    margin: 5,
    fontFamily: 'Arial',
    color: 'black',
  },
});
