import {SectionList, StyleSheet, Dimensions, Text} from 'react-native';
import React, {useMemo} from 'react';
import {useFirestore} from '../context/FirestoreContext';
import ImageItem from '../components/ImageItem';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '../navigation/StackNavigators';
import {FlashList} from '@shopify/flash-list';
import {createRows} from '../util/functions';
import {PhotoDocument} from '../util/types';
import {Title} from 'react-native-paper';
import ImageRow from '../components/ImageRow';
import SyncImageRow from '../components/SyncImageRow';

type Props = NativeStackScreenProps<AppStackParamList, 'ViewSyncAlbum'>;

const screenWidth = Dimensions.get('screen').width;

const ViewSyncAlbumScreen = ({navigation}: Props) => {
  const {sharedByUser, sharedWithUser} = useFirestore();

  const handleImagePress = (uri: string) => {
    console.log('Called');
    navigation.navigate('ViewImage', {uri});
  };

  const rows = useMemo(() => {
    const sharedByUserRows = createRows(sharedByUser, 3);
    const sharedWithUserRows = createRows(sharedWithUser, 3);

    return [
      {type: 'heading', text: 'Shared by You'},
      ...sharedByUserRows.map(row => ({
        type: 'photos',
        data: row,
        width: screenWidth / 3,
        onPress: handleImagePress,
      })),
      // {type: 'photos', data: sharedByUserRows},
      {type: 'heading', text: 'Shared With You'},
      ...sharedWithUserRows.map(row => ({
        type: 'photos',
        data: row,
        width: screenWidth / 3,
        onPress: handleImagePress,
      })),
    ] as ListRendererProps[];
  }, [sharedByUser, sharedWithUser]);

  return (
    <FlashList
      data={rows}
      estimatedItemSize={5}
      renderItem={({item}) => <ListRenderer {...item} />}
    />
  );
};

export default ViewSyncAlbumScreen;

type ListRendererProps =
  | {
      type: 'heading';
      text: string;
    }
  | {
      type: 'photos';
      data: PhotoDocument[];
      width: number;
      onPress: (uri: string) => void;
    };
const ListRenderer = (props: ListRendererProps) => {
  if (props.type === 'heading') {
    return <Title>{props.text}</Title>;
  } else {
    return (
      <SyncImageRow
        data={props.data}
        width={props.width}
        onPress={props.onPress}
      />
    );
  }
};

const styles = StyleSheet.create({});
