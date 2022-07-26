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
        <View style={styles.container}>
          <Avatar.Icon size={34} icon={isSelected ? 'check-bold' : 'account'} />
          <View style={styles.textContainer}>
            <Title>{data.givenName}</Title>
            <View>
              {data.phoneNumbers.length > 0 && (
                <Caption>
                  {data.phoneNumbers[0].number
                    ? data.phoneNumbers[0].number
                    : 'No Number'}
                </Caption>
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
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
});
