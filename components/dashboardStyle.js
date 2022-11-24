import {StyleSheet} from 'react-native';

const DashboardStyle = StyleSheet.create({
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
    borderRadius: 10,
    alignItems: 'center',
    height: '70%',
    width: '80%',
  },
  button: {
    width: '80%',
    borderRadius: 25,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.8,
    backgroundColor: '#FFD700',
    marginBottom: 50,
  },
  welcome: {
    color: '#FF0000',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 50,
    fontFamily: 'Copperplate',
    marginBottom: 20,
    marginTop: 30,
  },
  title: {
    color: '#FF0000',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Arial',
    marginBottom: 20,
    marginTop: 30,
  },
  list: {
    width: '70%',
    alignContent: 'center',
  },
});

export default DashboardStyle;
