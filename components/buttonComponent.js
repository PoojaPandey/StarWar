import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function buttonComponent({onPress, title, isDisabled}) {
  return (
    <TouchableOpacity
      style={[styles.button, {opacity: isDisabled === true ? 0.5 : 1}]}
      disabled={isDisabled}
      onPress={onPress}>
      {/* <LinearGradient colors={['#FFD700', '#009688']} style={styles.button}> */}
      <Text style={styles.text}>{title}</Text>
      {/* </LinearGradient> */}
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
