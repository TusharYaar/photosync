import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import CameraRoll from '@react-native-community/cameraroll';

const AllAlbumScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [album, setAlbum] = useState<CameraRoll.Album[]>([]);
  useEffect(() => {
    CameraRoll.getAlbums({assetType: 'All'}).then(data => setAlbum(data));
  }, []);

  return (
    <View>
      <Text>AllAlbumScreen</Text>
    </View>
  );
};

export default AllAlbumScreen;

const styles = StyleSheet.create({});
