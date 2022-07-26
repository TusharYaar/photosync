import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';

import CameraRoll from '@react-native-community/cameraroll';
import {Surface, Title, TouchableRipple} from 'react-native-paper';

type Props = {
  data: CameraRoll.Album;
  width: number;
  onPress: (data: CameraRoll.Album) => void;
};

const Album = ({data, width, onPress}: Props) => {
  const [images, setImages] = useState<string[] | null>(null);

  const getPhotos = useCallback(async () => {
    const d = await CameraRoll.getPhotos({
      first: 4,
      assetType: 'Photos',
      groupName: data.title,
    });
    setImages(d.edges.map(node => node.node.image.uri));
  }, [data]);

  useEffect(() => {
    getPhotos();
  }, [getPhotos]);

  return (
    <Surface style={{width, height: width}}>
      <TouchableRipple onPress={() => onPress(data)}>
        <View style={styles.inner}>
          <View style={styles.imageContainer}>
            {images
              ?.filter((image, index) => index < 4)
              .map((image, index) => (
                <Image
                  source={{uri: image}}
                  key={`${data.title}-${index}`}
                  style={{height: width / 2, width: width / 2}}
                />
              ))}
          </View>
          <View style={styles.textContainer}>
            <Title numberOfLines={1}>{data.title}</Title>
          </View>
        </View>
      </TouchableRipple>
    </Surface>
  );
};

export default Album;

const styles = StyleSheet.create({
  inner: {
    height: '100%',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  textContainer: {
    position: 'absolute',
    backgroundColor: 'orange',
    width: '100%',
    bottom: 0,
  },
});
