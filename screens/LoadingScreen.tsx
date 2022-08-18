import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '../navigation/StackNavigators';

type Props = NativeStackScreenProps<AppStackParamList, 'Loading'>;

const LoadingScreen = () => {
  return (
    <View style={styles.screen}>
      <Text>Loading.....</Text>
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
