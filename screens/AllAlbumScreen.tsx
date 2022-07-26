import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet} from 'react-native';

import CameraRoll from '@react-native-community/cameraroll';
import Album from '../components/Album';

import {AppStackParamList} from '../navigation/StackNavigators';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FlashList} from '@shopify/flash-list';
import {useFirestore} from '../context/FirestoreContext';
import SyncAlbum from '../components/SyncAlbum';

type Props = NativeStackScreenProps<AppStackParamList, 'AllAlbum'>;

const screenWidth = Dimensions.get('screen').width;

const AllAlbumScreen = ({navigation}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [album, setAlbum] = useState<CameraRoll.Album[]>([]);
  const {sharedWithUser} = useFirestore();
  useEffect(() => {
    CameraRoll.getAlbums({assetType: 'Photos'}).then(data => {
      if (sharedWithUser.length > 0) {
        const syncAlbum: CameraRoll.Album = {
          title: 'Photosync',
          count: sharedWithUser.length,
        };
        setAlbum([syncAlbum, ...data]);
      } else setAlbum(data);
    });
  }, [sharedWithUser]);

  const handleOnPress = (data: CameraRoll.Album) => {
    if (data.title === 'Photosync') {
      return;
    } else
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
        <AlbumRenderer
          data={data.item}
          width={screenWidth / 2}
          onPress={handleOnPress}
        />
      )}
    />
  );
};

export default AllAlbumScreen;

type AlbumRendererProps = {
  data: CameraRoll.Album;
  width: number;
  onPress: (data: CameraRoll.Album) => void;
};

const AlbumRenderer = (props: AlbumRendererProps) => {
  if (props.data.title === 'Photosync') return <SyncAlbum {...props} />;
  else return <Album {...props} />;
};

const styles = StyleSheet.create({});
