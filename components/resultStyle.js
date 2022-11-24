import {StyleSheet} from 'react-native';

const resultStyle = StyleSheet.create({
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
  innerContainer: {
    backgroundColor: 'white',
    // justifyContent: 'center',
    borderRadius: 10,
    alignItems: 'center',
    height: '95%',
    width: '90%',
  },
  nextButton: {
    width: '80%',
    borderRadius: 25,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.8,
    backgroundColor: '#FF0000',
    marginBottom: 50,
  },
  question: {
    justifyContent: 'center',
    alignContent: 'center',
    padding: 20,
  },
  list: {
    width: '100%',
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 10,
  },
  result: {
    color: '#32CD32',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Arial',
    marginBottom: 20,
    marginTop: 30,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#F0F8FF',
    borderRadius: 10,
    // opacity: 1,
  },
  shadowProp: {
    shadowOffset: {width: 10, height: 10},
    shadowColor: 'red',
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  close: {
    marginRight: 10,
  },
});

export default resultStyle;
