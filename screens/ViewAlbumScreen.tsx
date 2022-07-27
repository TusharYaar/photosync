import {Image, StyleSheet, Dimensions} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';

import CameraRoll from '@react-native-community/cameraroll';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '../navigation/StackNavigators';
import {FlashList} from '@shopify/flash-list';
// import ImageItem from '../components/ImageItem';
import {createRows} from '../util/functions';
import ImageRow from '../components/ImageRow';

type Props = NativeStackScreenProps<AppStackParamList, 'ViewAlbum'>;

const screenWidth = Dimensions.get('screen').width;

const ViewAlbumScreen = ({navigation, route}: Props) => {
  const [images, setImages] = useState<string[]>([]);

  const rows = useMemo(() => createRows(images, 3), [images]);

  const getPhotos = useCallback(async () => {
    const d = await CameraRoll.getPhotos({
      first: 240,
      assetType: 'All',
      groupName: route.params.data.title,
    });
    setImages(d.edges.map(node => node.node.image.uri));
  }, [route.params.data]);

  useEffect(() => {
    getPhotos();
  }, [getPhotos]);

  const handleImagePress = (uri: string) => {
    navigation.navigate('ViewImage', {uri});
  };

  return (
    <FlashList
      data={rows}
      estimatedItemSize={96}
      renderItem={data => (
        <ImageRow
          data={data.item}
          width={screenWidth / 3}
          onPress={handleImagePress}
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
