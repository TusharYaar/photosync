import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import ImageItem from './ImageItem';
import {PhotoDocument} from '../util/types';

type Props = {
  data: PhotoDocument[];
  width: number;
  onPress: (uri: string) => void;
};

const SyncImageRow = ({data, width, onPress}: Props) => {
  return (
    <View style={styles.row}>
      {data.map(img => (
        <ImageItem
          key={img.id}
          uri={img.path}
          width={width}
          onPress={() => onPress(img.path)}
        />
      ))}
    </View>
  );
};

export default SyncImageRow;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
});
