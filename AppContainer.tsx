import React from 'react';
import AppProvider from './context/AppContext';
import {NavigationContainer} from '@react-navigation/native';
import App from './App';
import FirestoreProvider from './context/FirestoreContext';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const AppContainer = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <AppProvider>
          <FirestoreProvider>
            <App />
          </FirestoreProvider>
        </AppProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default AppContainer;
