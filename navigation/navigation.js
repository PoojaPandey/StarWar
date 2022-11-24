import * as React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Button} from 'react-native';
const Stack = createNativeStackNavigator();

import Login from '../components/login';
import Dashboard from '../components/dashboard';
import QuestionsScreen from '../components/questionsScreen';
import ResultScreen from '../components/resultScreen';
import * as Constant from '../utils/constant';

const AuthStack = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name={Constant.LOGIN_SCREEN}
        component={Login}
        options={({title: Constant.LOGIN_SCREEN}, {headerShown: false})}
      />
      <Stack.Screen
        name={Constant.DASHBOARD_SCREEN}
        component={Dashboard}
        options={
          ({title: Constant.DASHBOARD_SCREEN},
          {
            headerStyle: {
              backgroundColor: '#4682B4',
            },
            headerBackVisible: false,
            headerRight: () => <Button title="Logout" />,
          })
        }
      />
      <Stack.Screen
        name={Constant.QUESTIONS_SCREEN}
        component={QuestionsScreen}
        options={
          ({title: Constant.QUESTIONS_SCREEN},
          {
            headerStyle: {
              backgroundColor: '#4682B4',
            },
            headerBackVisible: false,
          })
        }
      />
      <Stack.Screen
        name={Constant.RESULT_SCREEN}
        component={ResultScreen}
        options={
          ({title: Constant.RESULT_SCREEN},
          {
            headerStyle: {
              backgroundColor: '#4682B4',
            },
            headerBackVisible: false,
            headerRight: () => <Button title="Logout" />,
          })
        }
      />
    </Stack.Navigator>
  </NavigationContainer>
);
const Navigation = () => {
  return <AuthStack />;
};
export default Navigation;
