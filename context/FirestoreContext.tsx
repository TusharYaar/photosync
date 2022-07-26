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
import {PhotoDocument} from '../util/Types';

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
  const {user} = useApp();
  const [sharedByUser, setSharedByUser] = useState<any[]>([]);
  const [sharedWithUser, setSharedWithUser] = useState([]);

  useEffect(() => {
    if (user) {
      const shared = firestore()
        .collection('Photos')
        .where('sharedWith', 'array-contains', user.phoneNumber)
        .onSnapshot(documentSnapshot => {
          if (documentSnapshot)
            documentSnapshot.forEach(d => console.log(d.data()));
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
    console.log(doc);
    const path = await uploadImageToStorage(doc);
    console.log(path);
    await firestore()
      .collection('Photos')
      .add({...doc, path});
  };

  const uploadImageToStorage = async (doc: Omit<PhotoDocument, 'id'>) => {
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
