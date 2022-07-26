import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet} from 'react-native';

import CameraRoll from '@react-native-community/cameraroll';
import Album from '../components/Album';

import {AppStackParamList} from '../navigation/StackNavigators';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FlashList} from '@shopify/flash-list';

type Props = NativeStackScreenProps<AppStackParamList, 'AllAlbum'>;

const screenWidth = Dimensions.get('screen').width;

const AllAlbumScreen = ({navigation}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [album, setAlbum] = useState<CameraRoll.Album[]>([]);
  useEffect(() => {
    CameraRoll.getAlbums({assetType: 'Photos'}).then(data => setAlbum(data));
  }, []);

  const handleOnPress = (data: CameraRoll.Album) => {
    navigation.navigate('ViewAlbum', {
      data,
    });
  };

  return (
    <FlashList
      estimatedItemSize={40}
      numColumns={2}
      data={album}
      renderItem={data => (
        <Album
          data={data.item}
          width={screenWidth / 2}
          onPress={handleOnPress}
        />
      )}
    />
  );
};

export default AllAlbumScreen;

const styles = StyleSheet.create({});
