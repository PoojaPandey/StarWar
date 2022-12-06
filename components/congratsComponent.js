import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';

export default function CongratsComponent() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, []);

  // If show is false the component will return null and stop here
  if (!show) {
    return null;
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        source={require('../asset/bg5.jpeg')}
        style={styles.bgimage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  bgimage: {
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden',
    alignItems: 'center',
  },
});
