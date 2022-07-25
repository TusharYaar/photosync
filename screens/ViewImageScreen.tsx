import {Dimensions, Image, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '../navigation/StackNavigators';
import ImageToolbar from '../components/ImageToolbar';
import {useFirestore} from '../context/FirestoreContext';

type Props = NativeStackScreenProps<AppStackParamList, 'ViewImage'>;

const screenWidth = Dimensions.get('screen').width;

const ViewImageScreen = ({navigation, route}: Props) => {
  const [size, setSize] = useState({width: screenWidth, height: 0});

  const {sharedByUser} = useFirestore();

  useEffect(() => {
    Image.getSize(route.params.uri, (width, height) => {
      const h = (height * screenWidth) / width;
      setSize({width: screenWidth, height: h});
    });
  }, [route.params.uri]);

  return (
    <View style={styles.screen}>
      <View style={styles.imageContainer}>
        <Image source={{uri: route.params.uri}} style={[size]} />
      </View>
      <ImageToolbar onPressShare={() => {}} />
    </View>
  );
};

export default ViewImageScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  toolbar: {
    height: 50,
    backgroundColor: 'red',
  },
});
