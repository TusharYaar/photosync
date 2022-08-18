import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import AppStack from './navigation/StackNavigators';

const App = () => {
  return (
    <PaperProvider>
      <AppStack />
    </PaperProvider>
  );
};

export default App;
