import {StyleSheet, View} from 'react-native';
import React from 'react';
import {IconButton, TouchableRipple} from 'react-native-paper';

type Props = {
  onPressShare: () => void;
};

const ImageToolbar = ({onPressShare}: Props) => {
  return (
    <View>
      <TouchableRipple onPress={onPressShare}>
        <IconButton icon={'share-variant'} />
      </TouchableRipple>
    </View>
  );
};

export default ImageToolbar;

const styles = StyleSheet.create({});
