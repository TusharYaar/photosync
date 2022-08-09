import {StyleSheet, View} from 'react-native';
import React from 'react';
import {TouchableRipple} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  onPressShare: () => void;
  onPressFace: () => void;
  showShare: boolean;
};

const ImageToolbar = ({onPressShare, onPressFace, showShare = true}: Props) => {
  return (
    <View style={styles.container}>
      {showShare && (
        <TouchableRipple onPress={onPressShare} style={styles.option}>
          {showShare && <Icon name={'share-variant'} size={24} />}
        </TouchableRipple>
      )}

      <TouchableRipple onPress={onPressFace}>
        <Icon name="face-recognition" size={24} />
      </TouchableRipple>
    </View>
  );
};

export default ImageToolbar;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  option: {
    padding: 10,
  },
});
