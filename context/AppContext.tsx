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
import {Snackbar} from 'react-native-paper';
import {usePermission} from './PermissionContext';

type AppContext = {
  contacts: Contacts.Contact[];
  isOnline: boolean | null;
  isLoggedIn: boolean;
  signOutUser: () => void;
  user: FirebaseAuthTypes.User | null;
  showSnackbar: (message: string) => void;
};

const initialState: AppContext = {
  contacts: [],
  isOnline: true,
  isLoggedIn: false,
  user: null,
  showSnackbar: (message: string) => {},
  signOutUser: () => {},
};

export const AppContext = createContext(initialState);

export const useApp = () => useContext(AppContext);
const AppProvider = ({children}: {children: React.ReactNode}) => {
  const {hasContactPermission} = usePermission();

  const [isOnline, setIsOnline] = useState<boolean | null>(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);

  const [snackbar, setSnackbar] = useState({message: '', visible: false});

  const signOutUser = () => {
    auth().signOut();
  };

  // Handle user state changes
  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
    // signOutUser();
    // console.log(user);
    if (user?.uid) setIsLoggedIn(true);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    if (hasContactPermission)
      Contacts.getAll().then(data => {
        data = data
          .filter(d => d.phoneNumbers.length >= 1)
          .sort((a, b) => a.displayName.localeCompare(b.displayName));
        setContacts(data);
      });
  }, [hasContactPermission]);
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

  const showSnackbar = (message: string) => {
    setSnackbar({message, visible: true});
  };
  const hideSnackbar = () => {
    setSnackbar(state => ({...state, visible: false}));
  };

  return (
    <AppContext.Provider
      value={{
        isOnline,
        isLoggedIn,
        user,
        contacts,
        showSnackbar,
        signOutUser,
      }}>
      <>
        {children}
        <Snackbar
          visible={snackbar.visible}
          duration={4000}
          onDismiss={hideSnackbar}>
          {snackbar.message}
        </Snackbar>
      </>
    </AppContext.Provider>
  );
};

export default AppProvider;
