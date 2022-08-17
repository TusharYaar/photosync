import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
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
  signInUser?: (
    number: string,
  ) => Promise<FirebaseAuthTypes.ConfirmationResult>;
  resendCodeIn: number;
};

const initialState: AppContext = {
  contacts: [],
  isOnline: true,
  isLoggedIn: false,
  user: null,
  showSnackbar: (message: string) => {},
  signOutUser: () => {},
  resendCodeIn: 0,
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
  const [countDownInterval, setCountDownInterval] = useState({time: 0, id: 0});

  const startCountDownInterval = () => {
    const interval = setInterval(() => {
      setCountDownInterval(state => {
        if (state.time >= 90) {
          clearInterval(state.id);
          return {...state, time: 0};
        }
        return {...state, time: state.time + 1};
      });
    }, 1000);
    setCountDownInterval(state => ({...state, id: interval}));
  };

  const signInUser = useCallback(
    async (phoneNumber: string) => {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      startCountDownInterval();
      return confirmation;
    },
    [auth],
  );

  const signOutUser = useCallback(() => {
    auth().signOut();
  }, [auth]);

  // Handle user state changes
  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
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
        resendCodeIn: countDownInterval.time,
        signInUser,
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
