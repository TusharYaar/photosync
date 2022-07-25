import {Image, StyleSheet, Text, Dimensions} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';

import CameraRoll from '@react-native-community/cameraroll';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '../navigation/StackNavigators';
import {FlashList} from '@shopify/flash-list';
import ImageItem from '../components/ImageItem';

type Props = NativeStackScreenProps<AppStackParamList, 'ViewAlbum'>;

const screenWidth = Dimensions.get('screen').width;

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
    <FlashList
      data={images}
      estimatedItemSize={96}
      numColumns={4}
      renderItem={data => (
        <ImageItem
          uri={data.item}
          width={screenWidth / 4}
          onPress={() => navigation.navigate('ViewImage', {uri: data.item})}
        />
      )}
    />
  );
};

export default ViewAlbumScreen;

const styles = StyleSheet.create({
  imageStyle: {
    height: 40,
    width: 40,
  },
});
