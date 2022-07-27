import React, {
  createContext,
  // useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {useApp} from './AppContext';
import {PhotoDocument} from '../util/types';

type FirestoreContext = {
  sharedByUser: PhotoDocument[];
  sharedWithUser: PhotoDocument[];
  addImageDocForShare?: (doc: Omit<PhotoDocument, 'id'>) => void;
};

const initialState: FirestoreContext = {
  sharedByUser: [],
  sharedWithUser: [],
};

export const FirestoreContext = createContext(initialState);

export const useFirestore = () => useContext(FirestoreContext);

const FirestoreProvider = ({children}: {children: React.ReactNode}) => {
  const {user, showSnackbar} = useApp();
  const [sharedByUser, setSharedByUser] = useState<any[]>([]);
  const [sharedWithUser, setSharedWithUser] = useState<PhotoDocument[]>([]);

  useEffect(() => {
    if (user) {
      const shared = firestore()
        .collection('Photos')
        .where('sharedWith', 'array-contains', user.phoneNumber)
        .onSnapshot(documentSnapshot => {
          if (documentSnapshot) {
            const data: PhotoDocument[] = [];
            documentSnapshot.forEach(d =>
              data.push({...d.data(), id: d.id} as PhotoDocument),
            );
            setSharedWithUser(data);
          }
        });
      // Stop listening for updates when no longer required
      return () => shared();
    }
  }, [user]);
  useEffect(() => {
    if (user) {
      firestore()
        .collection('Photos')
        .where('owner', '==', user.phoneNumber)
        .get()
        .then(snapshot => {
          const data: any[] = [];
          snapshot.forEach(doc => {
            data.push({
              ...doc.data(),
              id: doc.id,
            });
          });
          setSharedByUser(data);
        })
        .catch(e => console.log(e));
    }
  }, [user]);

  const addImageDocForShare = async (doc: Omit<PhotoDocument, 'id'>) => {
    const path = await uploadImageToStorage(doc);
    await firestore()
      .collection('Photos')
      .add({...doc, path});
    showSnackbar('Shared');
  };

  const uploadImageToStorage = async (doc: Omit<PhotoDocument, 'id'>) => {
    showSnackbar('Uploading');
    const reference = storage().ref(`${doc.owner}/${doc.name}`);
    await reference.putFile(doc.path);
    const path = await reference.getDownloadURL();
    return path;
  };

  return (
    <FirestoreContext.Provider
      value={{
        sharedByUser,
        sharedWithUser,
        addImageDocForShare,
      }}>
      {children}
    </FirestoreContext.Provider>
  );
};

export default FirestoreProvider;
