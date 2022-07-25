import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import type {Album} from '@react-native-community/cameraroll';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AllAlbumScreen from '../screens/AllAlbumScreen';
import ViewAlbumScreen from '../screens/ViewAlbumScreen';

export type AppStackParamList = {
  AllAlbum: undefined;
  ViewAlbum: {data: Album};
};
const AppNavigator = createNativeStackNavigator<AppStackParamList>();

const AppStack = () => {
  return (
    <AppNavigator.Navigator>
      <AppNavigator.Screen name="AllAlbum" component={AllAlbumScreen} />
      <AppNavigator.Screen name="ViewAlbum" component={ViewAlbumScreen} />
    </AppNavigator.Navigator>
  );
};

export default AppStack;

const styles = StyleSheet.create({});
