import {StyleSheet} from 'react-native';

const questionsStyle = StyleSheet.create({
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
    justifyContent: 'center',
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
});

export default questionsStyle;
