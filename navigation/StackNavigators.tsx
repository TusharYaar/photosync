import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';

import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
// import AllAlbumScreen from '../screens/AllAlbumScreen';
// import ViewAlbumScreen from '../screens/ViewAlbumScreen';
// import ViewImageScreen from '../screens/ViewImageScreen';
// import ViewSyncAlbumScreen from '../screens/ViewSyncAlbumScreen';
import LoginScreen from '../screens/LoginScreen';
import InputCodeScreen from '../screens/InputCodeScreen';
import TermScreen from '../screens/TermScreen';
import StartScreen from '../screens/StartScreen';
import LoadingScreen from '../screens/LoadingScreen';
import {useNavigation} from '@react-navigation/native';
import {useApp} from '../context/AppContext';
export type AppStackParamList = {
  Start: undefined;
  Login: undefined;
  InputCode: {number: string};
  Terms: undefined;
  Loading: undefined;
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
  const {isLoggedIn} = useApp();
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  useEffect(() => {
    console.log(isLoggedIn);
    if (isLoggedIn === false) {
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    } else if (isLoggedIn)
      navigation.reset({
        index: 0,
        routes: [{name: 'Start'}],
      });
  }, [isLoggedIn]);

  return (
    <AppNavigator.Navigator>
      <AppNavigator.Group
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
        <AppNavigator.Screen name="Loading" component={LoadingScreen} />
        <AppNavigator.Screen name="Start" component={StartScreen} />
        <AppNavigator.Screen name="Terms" component={TermScreen} />
        <AppNavigator.Screen name="Login" component={LoginScreen} />
        <AppNavigator.Screen name="InputCode" component={InputCodeScreen} />
      </AppNavigator.Group>
      {/* <AppNavigator.Screen name="AllAlbum" component={} /> */}
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
