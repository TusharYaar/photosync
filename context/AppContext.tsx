import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {Permission, PermissionsAndroid} from 'react-native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

import Contacts from 'react-native-contacts';
import NetInfo from '@react-native-community/netinfo';

type AppContext = {
  haveStoragePermission: boolean;
  haveContactPermission: boolean;
  contacts?: Contacts.Contact[];
  isOnline: boolean | null;
  isLoggedIn: boolean;
  user: FirebaseAuthTypes.User | null;
};

const initialState: AppContext = {
  haveStoragePermission: false,
  haveContactPermission: false,
  contacts: [],
  isOnline: true,
  isLoggedIn: false,
  user: null,
  //   theme: 'light',
};

export const AppContext = createContext(initialState);

export const useApp = () => useContext(AppContext);
const AppProvider = ({children}: {children: React.ReactNode}) => {
  const [haveStoragePermission, setHaveStoragePermission] = useState(false);
  const [haveContactPermission, setHaveContactPermission] = useState(false);
  const [isOnline, setIsOnline] = useState<boolean | null>(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);

  const checkAndroidPermission = useCallback(async () => {
    const contactPermission = PermissionsAndroid.PERMISSIONS.READ_CONTACTS;
    const storagePermission =
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    const hasContactPermission = await PermissionsAndroid.check(
      contactPermission,
    );
    const hasStoragePermission = await PermissionsAndroid.check(
      storagePermission,
    );
    const request: Permission[] = [];

    if (hasContactPermission) setHaveContactPermission(hasContactPermission);
    else request.push(contactPermission);

    if (hasStoragePermission) setHaveStoragePermission(hasStoragePermission);
    else request.push(storagePermission);

    if (request.length > 0) {
      const status = await PermissionsAndroid.requestMultiple(request);
      if (status[contactPermission])
        setHaveContactPermission(status[contactPermission] === 'granted');
      if (status[storagePermission])
        setHaveContactPermission(status[storagePermission] === 'granted');
    }
  }, []);

  // Handle user state changes
  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
    if (user?.uid) setIsLoggedIn(true);
  }

  useEffect(() => {
    checkAndroidPermission();
  }, []);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    if (haveContactPermission)
      Contacts.getAllWithoutPhotos().then(data => {
        data
          .filter(d => d.phoneNumbers.length > 0)
          .sort((a, b) => b.displayName.localeCompare(a.displayName));
        setContacts(data);
      });
  }, [haveContactPermission]);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isInternetReachable);
      // dispatch(
      //   updateIsOnline(state.isInternetReachable === false ? false : true),
      // );
      // if (state.isInternetReachable === false) val.value = withTiming(30);

      // if (state.isInternetReachable) val.value = withDelay(1500, withTiming(0));
    });

    return unsubscribe;
  }, []);

  return (
    <AppContext.Provider
      value={{
        haveStoragePermission,
        haveContactPermission,
        isOnline,
        isLoggedIn,
        user,
        contacts,
      }}>
      <>{children}</>
    </AppContext.Provider>
  );
};

export default AppProvider;
