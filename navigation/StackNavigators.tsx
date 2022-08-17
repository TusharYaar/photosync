import {StyleSheet} from 'react-native';
import React from 'react';

// import type {Album} from 'react-native-photo-gallery-api';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import AllAlbumScreen from '../screens/AllAlbumScreen';
// import ViewAlbumScreen from '../screens/ViewAlbumScreen';
// import ViewImageScreen from '../screens/ViewImageScreen';
// import ViewSyncAlbumScreen from '../screens/ViewSyncAlbumScreen';
import LoginScreen from '../screens/LoginScreen';
import InputCodeScreen from '../screens/InputCodeScreen';
import TermScreen from '../screens/TermScreen';
export type AppStackParamList = {
  Login: undefined;
  InputCode: {number: string};
  Terms: undefined;
  // AllAlbum: undefined;
  // ViewAlbum: {data: Album};
  // ViewImage: {
  // uri: string;
  // };
  SelectContact: undefined;
  ViewSyncAlbum: undefined;
};
const AppNavigator = createNativeStackNavigator<AppStackParamList>();

const AppStack = () => {
  return (
    <AppNavigator.Navigator>
      <AppNavigator.Group
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
        <AppNavigator.Screen name="Login" component={LoginScreen} />
        <AppNavigator.Screen name="InputCode" component={InputCodeScreen} />
        <AppNavigator.Screen name="Terms" component={TermScreen} />
      </AppNavigator.Group>
      {/* <AppNavigator.Screen name="AllAlbum" component={AllAlbumScreen} /> */}
      {/* <AppNavigator.Screen name="ViewAlbum" component={ViewAlbumScreen} /> */}
      {/* <AppNavigator.Screen name="ViewImage" component={ViewImageScreen} /> */}
      {/* <AppNavigator.Screen
        name="ViewSyncAlbum"
        component={ViewSyncAlbumScreen}
      /> */}
    </AppNavigator.Navigator>
  );
};

export default AppStack;

const styles = StyleSheet.create({});
