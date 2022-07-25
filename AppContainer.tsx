import React from 'react';
import AppProvider from './context/App';
import {NavigationContainer} from '@react-navigation/native';
import App from './App';

const AppContainer = () => {
  return (
    <NavigationContainer>
      <AppProvider>
        <App />
      </AppProvider>
    </NavigationContainer>
  );
};

export default AppContainer;
