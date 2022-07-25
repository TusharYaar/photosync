import React from 'react';
import LoginScreen from './screens/LoginScreen';
import {Provider as PaperProvider} from 'react-native-paper';
import {useApp} from './context/App';
import AppStack from './navigation/StackNavigators';

const App = () => {
  const {isLoggedIn} = useApp();

  return (
    <PaperProvider>
      {!isLoggedIn && <LoginScreen />}
      {isLoggedIn && <AppStack />}
    </PaperProvider>
  );
};

export default App;
