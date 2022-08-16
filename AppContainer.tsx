import React from 'react';
import AppProvider from './context/AppContext';
import {NavigationContainer} from '@react-navigation/native';
import App from './App';
import FirestoreProvider from './context/FirestoreContext';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import PermissionProvider from './context/PermissionContext';

const AppContainer = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <PermissionProvider>
          <AppProvider>
            <FirestoreProvider>
              <App />
            </FirestoreProvider>
          </AppProvider>
        </PermissionProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default AppContainer;
