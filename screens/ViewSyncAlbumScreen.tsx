import {SectionList, StyleSheet, Dimensions, Text} from 'react-native';
import React, {useMemo} from 'react';
import {useFirestore} from '../context/FirestoreContext';
import ImageItem from '../components/ImageItem';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '../navigation/StackNavigators';

type Props = NativeStackScreenProps<AppStackParamList, 'ViewSyncAlbum'>;

const screenWidth = Dimensions.get('screen').width;

const ViewSyncAlbumScreen = ({navigation}: Props) => {
  const {sharedByUser, sharedWithUser} = useFirestore();

  const sections = useMemo(() => {
    return [
      {
        title: 'Shared By You',
        data: sharedByUser,
      },
      {
        title: 'Shared To You',
        data: sharedWithUser,
      },
    ];
  }, [sharedByUser, sharedWithUser]);

  return (
    <SectionList
      sections={sections}
      renderItem={({item}) => (
        <ImageItem
          uri={item.path}
          width={screenWidth / 4}
          onPress={() => navigation.navigate('ViewImage', {uri: item.path})}
        />
      )}
      renderSectionHeader={({section: {title}}) => <Text>{title}</Text>}
    />
  );
};

export default ViewSyncAlbumScreen;

const styles = StyleSheet.create({});
