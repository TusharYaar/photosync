import React, {
  createContext,
  // useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import firestore from '@react-native-firebase/firestore';
import {useApp} from './AppContext';

type FirestoreContext = {
  sharedByUser: any[];
  sharedWithUser: any[];
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
        .onSnapshot(() => {});
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

  return (
    <FirestoreContext.Provider
      value={{
        sharedByUser,
        sharedWithUser,
      }}>
      {children}
    </FirestoreContext.Provider>
  );
};

export default FirestoreProvider;
