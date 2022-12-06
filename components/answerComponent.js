import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function answerComponent({item, isSelected}) {
  const getColor = () => {
    if (isSelected === true) {
      return '#4682B4';
    }
    return 'white';
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: getColor(),
        },
      ]}>
      <Text style={styles.item}>{item}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 10,
    padding: 0,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#4682B4',
  },
  item: {
    fontSize: 14,
    margin: 10,
    fontFamily: 'Arial',
    color: 'black',
  },
});
