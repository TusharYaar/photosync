import React from 'react';
import LoginScreen from './screens/LoginScreen';
import {Provider as PaperProvider} from 'react-native-paper';
import {useApp} from './context/AppContext';
import AppStack from './navigation/StackNavigators';

const App = () => {
  const {isLoggedIn, signOutUser} = useApp();
  // console.log(isLoggedIn);
  // if (isLoggedIn) signOutUser();
  return (
    <PaperProvider>
      {!isLoggedIn && <LoginScreen />}
      {isLoggedIn && <AppStack />}
    </PaperProvider>
  );
};

export default App;
