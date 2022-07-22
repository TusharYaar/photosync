import React, {useEffect} from 'react';
import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';

const App = () => {
  const hasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }
    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  };

  useEffect(() => {
    hasAndroidPermission();
    console.log(
      CameraRoll.getAlbums({assetType: 'All'}).then(data => console.log(data)),
    );
  }, []);

  return (
    <View style={styles.screen}>
      <Text>App</Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
