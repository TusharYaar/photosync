import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {
  Button,
  Caption,
  Paragraph,
  Subheading,
  Title,
} from 'react-native-paper';

import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '../navigation/StackNavigators';
type Props = NativeStackScreenProps<AppStackParamList, 'Terms'>;
const TermScreen = ({navigation}: Props) => {
  return (
    <View style={styles.screen}>
      <Title>Terms And Conditions</Title>
      <Caption>Alpha version</Caption>
      <ScrollView>
        <View>
          <Subheading>TL;DR</Subheading>
          <Paragraph>
            This is a hobby project I(Tushar) made to learn app development. It
            has ads to pay for the servers required for sharing.The app does not
            share your data with any third party without your concent. All Image
            processing happens on your device.
          </Paragraph>
        </View>
        <View>
          <Subheading>Full Version</Subheading>
          <Paragraph>Coming Soon (Hopefully)</Paragraph>
        </View>
      </ScrollView>
      <Button onPress={() => navigation.replace('Login')} mode="contained">
        Agree And Continue
      </Button>
    </View>
  );
};

export default TermScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
  },
});
