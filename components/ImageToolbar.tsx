import {StyleSheet, View} from 'react-native';
import React from 'react';
import {IconButton, TouchableRipple} from 'react-native-paper';

type Props = {
  onPressShare: () => void;
  showShare: boolean;
};

const ImageToolbar = ({onPressShare, showShare = true}: Props) => {
  return (
    <View>
      {showShare && (
        <TouchableRipple onPress={onPressShare}>
          {showShare && <IconButton icon={'share-variant'} />}
        </TouchableRipple>
      )}
    </View>
  );
};

export default ImageToolbar;

const styles = StyleSheet.create({});
