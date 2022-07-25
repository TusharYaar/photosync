import React from 'react';
import LoginScreen from './screens/LoginScreen';
import {Provider as PaperProvider} from 'react-native-paper';
import {useApp} from './context/App';
import AllAlbumScreen from './screens/AllAlbumScreen';

const App = () => {
  const {isLoggedIn} = useApp();

  // useEffect(() => {
  //   hasAndroidPermission();
  //   console.log(
  //     CameraRoll.getAlbums({assetType: 'All'}).then(data => console.log(data)),
  //   );
  // }, []);
  return (
    <PaperProvider>
      {!isLoggedIn && <LoginScreen />}
      {isLoggedIn && <AllAlbumScreen />}
    </PaperProvider>
  );
};

export default App;
