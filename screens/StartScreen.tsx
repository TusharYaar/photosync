import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Title, Button} from 'react-native-paper';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '../navigation/StackNavigators';

type Props = NativeStackScreenProps<AppStackParamList, 'Start'>;

const StartScreen = ({navigation}: Props) => {
  return (
    <View style={styles.screen}>
      <Title>Start Screen</Title>
      <Button mode="contained" onPress={() => navigation.replace('Terms')}>
        Get Started
      </Button>
    </View>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
});
