import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import ImageItem from './ImageItem';

type Props = {
  data: string[];
  width: number;
  onPress: (uri: string) => void;
};

const ImageRow = ({data, width, onPress}: Props) => {
  return (
    <View style={styles.row}>
      {data.map(uri => (
        <ImageItem
          key={uri}
          uri={uri}
          width={width}
          onPress={() => onPress(uri)}
        />
      ))}
    </View>
  );
};

export default ImageRow;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
});
