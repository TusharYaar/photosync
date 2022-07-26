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

type Props = NativeStackScreenProps<AppStackParamList, 'ViewImage'>;

const screenWidth = Dimensions.get('screen').width;

const ViewImageScreen = ({route}: Props) => {
  const {sharedByUser, addImageDocForShare} = useFirestore();
  const {contacts, user} = useApp();
  const [size, setSize] = useState({width: screenWidth, height: 0});
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [searchValue] = useDebounce(search, 500);

  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['50%', '100%'], []);

  const docDetails = useMemo(() => {
    const path = route.params.uri.split('/');
    const name = path[path.length - 1];
    const index = sharedByUser.findIndex(d => d.name === name);
    if (index == -1) return {name};
    else {
      return sharedByUser[index];
    }
  }, [route.params.uri]);

  const handleSnapPress = useCallback(() => {
    // console.log(sheetRef.current)
    sheetRef.current?.snapToIndex(1);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const addSlection = (phone: string, select: boolean) => {
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
        const newDoc: Omit<PhotoDocument, 'id'> = {
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

  return (
    <View style={styles.screen}>
      <View style={styles.imageContainer}>
        <Image source={{uri: route.params.uri}} style={[size]} />
      </View>
      <ImageToolbar onPressShare={handleSnapPress} />
      <BottomSheet ref={sheetRef} snapPoints={snapPoints}>
        <View>
          <TextInput value={search} onChangeText={text => setSearch(text)} />
          <Button onPress={() => {}}>Stop Sharing</Button>
          <Button onPress={handleClosePress}>Cancel</Button>
          <Button onPress={shareImageWithOthers}>
            Share with {selected.length} others
          </Button>
        </View>
        <BottomSheetFlatList
          data={contacts.filter(c =>
            searchValue.length > 0
              ? c.displayName.toLowerCase().includes(searchValue.toLowerCase())
              : true,
          )}
          keyExtractor={i => i.recordID}
          renderItem={i => (
            <Contact
              data={i.item}
              onPress={addSlection}
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
    backgroundColor: 'red',
  },
});
