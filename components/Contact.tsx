import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import type {Contact as ContactType} from 'react-native-contacts';
import {
  Surface,
  TouchableRipple,
  Title,
  Caption,
  Avatar,
} from 'react-native-paper';

type Props = {
  data: ContactType;
  onPress: (id: string, toState: boolean) => void;
  isSelected?: boolean;
};

const Contact = ({data, onPress, isSelected = false}: Props) => {
  const handleOnPress = () => {
    onPress(data.phoneNumbers[0].number, !isSelected);
  };
  return (
    <Surface style={isSelected ? styles.selected : null}>
      <TouchableRipple onPress={handleOnPress}>
        <View>
          <Avatar.Icon size={24} icon="account" />
          <View>
            <Title>{data.givenName}</Title>
            <View>
              {data.phoneNumbers.length > 0 && (
                <Caption>{data.phoneNumbers[0].number}</Caption>
              )}
            </View>
          </View>
        </View>
      </TouchableRipple>
    </Surface>
  );
};

export default Contact;

const styles = StyleSheet.create({
  selected: {
    backgroundColor: 'green',
  },
});
