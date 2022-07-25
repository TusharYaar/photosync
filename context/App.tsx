import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {PermissionsAndroid} from 'react-native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

type AppContext = {
  haveStoragePermission: boolean;
  isOnline: boolean;
  isLoggedIn: boolean;
  user: FirebaseAuthTypes.User | null;
};

const initialState: AppContext = {
  haveStoragePermission: false,
  isOnline: true,
  isLoggedIn: false,
  user: null,
  //   theme: 'light',
};

export const AppContext = createContext(initialState);

export const useApp = () => useContext(AppContext);
const AppProvider = ({children}: {children: React.ReactNode}) => {
  const [haveStoragePermission, setHaveStoragePermission] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  const hasAndroidPermission = useCallback(async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) setHaveStoragePermission(hasPermission);
    const status = await PermissionsAndroid.request(permission);
    setHaveStoragePermission(status === 'granted');
  }, []);

  // Handle user state changes
  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
    if (user?.uid) setIsLoggedIn(true);
  }

  useEffect(() => {
    hasAndroidPermission();
  }, []);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  return (
    <AppContext.Provider
      value={{
        haveStoragePermission,
        isOnline,
        isLoggedIn,
        user,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
