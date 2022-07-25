import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';

import CameraRoll from '@react-native-community/cameraroll';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '../navigation/StackNavigators';

type Props = NativeStackScreenProps<AppStackParamList, 'ViewAlbum'>;

const ViewAlbumScreen = ({navigation, route}: Props) => {
  const [images, setImages] = useState<string[]>([]);

  const getPhotos = useCallback(async () => {
    const d = await CameraRoll.getPhotos({
      first: 24,
      assetType: 'All',
      groupName: route.params.data.title,
    });
    setImages(d.edges.map(node => node.node.image.uri));
  }, [route.params.data]);

  useEffect(() => {
    getPhotos();
  }, [getPhotos]);
  return (
    <View>
      {images.map((image, index) => (
        <Image style={styles.imageStyle} source={{uri: image}} />
      ))}
    </View>
  );
};

export default ViewAlbumScreen;

const styles = StyleSheet.create({
  imageStyle: {
    height: 40,
    width: 40,
  },
});
