import React from 'react';
import AppProvider from './context/AppContext';
import {NavigationContainer} from '@react-navigation/native';
import App from './App';
import FirestoreProvider from './context/FirestoreContext';

const AppContainer = () => {
  return (
    <NavigationContainer>
      <AppProvider>
        <FirestoreProvider>
          <App />
        </FirestoreProvider>
      </AppProvider>
    </NavigationContainer>
  );
};

export default AppContainer;
