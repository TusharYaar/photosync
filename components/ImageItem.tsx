import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

type Props = {
  uri: string;
  width: number;
  onPress: () => void;
};

const ImageItem = ({uri, width, onPress}: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={{uri}}
        style={{
          width,
          height: width,
        }}
      />
    </TouchableOpacity>
  );
};

export default ImageItem;

const styles = StyleSheet.create({});
