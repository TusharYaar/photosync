import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {useApp} from './context/AppContext';
import AppStack from './navigation/StackNavigators';

const App = () => {
  const {isLoggedIn, signOutUser} = useApp();
  return <PaperProvider>{!isLoggedIn && <AppStack />}</PaperProvider>;
};

export default App;
