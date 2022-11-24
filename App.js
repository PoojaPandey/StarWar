/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Provider as StoreProvider} from 'react-redux';
import Navigation from './navigation/navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import store from './shared/store';

const App = () => {
  return (
    <StoreProvider store={store}>
      <SafeAreaProvider style={{flex: 1}}>
        <Navigation />
      </SafeAreaProvider>
    </StoreProvider>
  );
};

export default App;
