import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function buttonComponent({onPress, title, isDisabled}) {
  return (
    <TouchableOpacity
      style={[styles.button, {opacity: isDisabled === true ? 0.5 : 1}]}
      disabled={isDisabled}
      onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '80%',
    borderRadius: 25,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFD700',
    margin: 10,
  },
  text: {
    color: 'black',
    fontStyle: 'normal',
    fontWeight: 'bold',
  },
});
