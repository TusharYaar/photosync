import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  Button,
  Caption,
  Paragraph,
  Subheading,
  Title,
} from 'react-native-paper';

const TermScreen = () => {
  return (
    <View style={styles.screen}>
      <Title>Terms And Conditions</Title>
      <Caption>Alpha version</Caption>
      <ScrollView>
        <View>
          <Subheading>TL;DR</Subheading>
          <Paragraph>
            This is a hobby project I(Tushar) made to learn app development. It
            has ads to pay for the servers required for sharing. Does not share
            your data. All Image processing happens on your device.
          </Paragraph>
        </View>
        <View>
          <Subheading>Full Version</Subheading>
          <Paragraph>Coming Soon (Hopefully)</Paragraph>
        </View>
      </ScrollView>
      <Button onPress={() => {}} mode="contained">
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
