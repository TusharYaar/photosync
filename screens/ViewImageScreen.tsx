import {Dimensions, Image, StyleSheet, View} from 'react-native';
import React, {useEffect, useState, useRef, useMemo, useCallback} from 'react';
import {useDebounce} from 'use-debounce';

import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '../navigation/StackNavigators';
import ImageToolbar from '../components/ImageToolbar';
import {useFirestore} from '../context/FirestoreContext';
import {useApp} from '../context/AppContext';
import Contact from '../components/Contact';
import {TextInput, Button} from 'react-native-paper';
import {PhotoDocument} from '../util/types';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = NativeStackScreenProps<AppStackParamList, 'ViewImage'>;

const screenWidth = Dimensions.get('screen').width;

const ViewImageScreen = ({route}: Props) => {
  const {sharedByUser, sharedWithUser, addImageDocForShare, stopPhotoSharing} =
    useFirestore();
  const {contacts, user} = useApp();
  const [size, setSize] = useState({width: screenWidth, height: 0});
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [searchValue] = useDebounce(search, 500);

  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['50%', '70%', '100%'], []);

  const docDetails: PhotoDocument = useMemo(() => {
    let photo = sharedByUser.find(d => d.path === route.params.uri);
    if (photo) setSelected(photo.sharedWith);
    if (!photo) {
      photo = sharedWithUser.find(d => d.path === route.params.uri);
    }

    if (!photo) {
      const path = route.params.uri.split('/');
      const name = path[path.length - 1];
      photo = {
        name,
        path: route.params.uri,
        owner: user?.phoneNumber || '',
        id: '',
        ref: '',
        sharedWith: [] as string[],
        downloadedBy: [] as string[],
      };
    }
    return photo;
  }, [route.params.uri, user]);

  const handleSnapPress = useCallback(() => {
    sheetRef.current?.snapToIndex(1);
  }, []);

  const addSelection = (phone: string, select: boolean) => {
    if (select) setSelected(state => [...state, phone]);
    else setSelected(state => state.filter(i => i !== phone));
  };

  useEffect(() => {
    Image.getSize(route.params.uri, (width, height) => {
      const h = (height * screenWidth) / width;
      setSize({width: screenWidth, height: h});
    });
  }, [route.params.uri]);

  const shareImageWithOthers = () => {
    if (selected.length > 0) {
      const doc = sharedByUser.find(d => d.name === docDetails.name);
      if (doc?.id) {
        const sharedWith = doc.sharedWith;
        console.log(sharedWith);
      } else {
        const newDoc: Omit<PhotoDocument, 'id' | 'ref'> = {
          name: docDetails.name,
          owner: user?.phoneNumber || '',
          path: route.params.uri,
          sharedWith: selected.map(s =>
            s.split(' ').join('').split('-').join(''),
          ),
          downloadedBy: [],
        };
        if (addImageDocForShare) {
          addImageDocForShare(newDoc);
        }
      }
    }

    sheetRef.current?.close();
  };

  const stopSharing = () => {
    if (stopPhotoSharing) stopPhotoSharing(docDetails);
  };

  const contactData = useMemo(() => {
    return contacts.filter(c =>
      searchValue.length > 0
        ? c.displayName.toLowerCase().includes(searchValue.toLowerCase())
        : true,
    );
  }, [selected, searchValue]);

  return (
    <View style={styles.screen}>
      <View style={styles.imageContainer}>
        <Image source={{uri: route.params.uri}} style={[size]} />
      </View>
      <ImageToolbar
        onPressShare={handleSnapPress}
        showShare={docDetails.owner === user?.phoneNumber || false}
      />
      <BottomSheet
        ref={sheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}>
        <View style={styles.sheetOptionContainer}>
          <TextInput
            value={search}
            onChangeText={text => setSearch(text)}
            dense={true}
            mode={'outlined'}
            label={'Name'}
            right={<TextInput.Icon name="magnify" />}
          />
          <View style={styles.sheetBtnContainer}>
            <Button
              onPress={stopSharing}
              mode="contained"
              color="red"
              style={styles.stopSharingBtn}>
              <Icon name="cancel" size={18} />
            </Button>
            <View style={styles.shareBtnContainer}>
              <Button
                onPress={shareImageWithOthers}
                style={styles.shareBtn}
                mode="contained">
                Share with {selected.length} others
              </Button>
            </View>
          </View>
        </View>
        <BottomSheetFlatList
          data={contactData}
          keyExtractor={i => i.recordID}
          renderItem={i => (
            <Contact
              data={i.item}
              onPress={addSelection}
              isSelected={selected.includes(i.item.phoneNumbers[0].number)}
            />
          )}
        />
      </BottomSheet>
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
  },
  sheetOptionContainer: {
    paddingHorizontal: 10,
  },
  sheetBtnContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  stopSharingBtn: {
    width: '20%',
  },
  shareBtnContainer: {
    width: '80%',
    paddingLeft: 10,
  },
  shareBtn: {
    width: '100%',
  },
});
