import React from 'react';
import {FaceBound} from '../mlkit';
import {StyleSheet, Text, View} from 'react-native';

type Props = {
  face: FaceBound;
  style: any;
  originalDimensions: {
    width: number;
    height: number;
  };
  scaledDimensions: {
    width: number;
    height: number;
  };
};

const ViewFace = ({
  face,
  style,
  originalDimensions,
  scaledDimensions,
}: Props) => {
  if (originalDimensions.height == 0) return <></>;

  const stylesheet = StyleSheet.create({
    face: {
      top: (face.centerY * scaledDimensions.height) / originalDimensions.height,
      left: (face.centerX * scaledDimensions.width) / originalDimensions.width,
      width: 10,
      height: 10,
      borderRadius: 10,
    },
  });

  return <View style={[stylesheet.face, style]} />;
};

export default ViewFace;

const styles = StyleSheet.create({});
