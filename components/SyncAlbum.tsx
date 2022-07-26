import {StyleSheet, Image, View} from 'react-native';
import React from 'react';
import type {Album} from '@react-native-community/cameraroll';
import {Surface, Title, TouchableRipple} from 'react-native-paper';
import {useFirestore} from '../context/FirestoreContext';

type Props = {
  data: Album;
  width: number;
  onPress: (data: Album) => void;
};

const SyncAlbum = ({width, onPress, data}: Props) => {
  const {sharedWithUser} = useFirestore();
  return (
    <View>
      <Surface style={{width, height: width}}>
        <TouchableRipple onPress={() => onPress(data)}>
          <View style={styles.inner}>
            <View style={styles.imageContainer}>
              {sharedWithUser
                ?.filter((image, index) => index < 4)
                .map((image, index) => (
                  <Image
                    source={{uri: image.path}}
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
    </View>
  );
};

export default SyncAlbum;

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
