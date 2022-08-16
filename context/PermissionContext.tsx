import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import {Permission, PermissionsAndroid} from 'react-native';

type PermissionContext = {
  hasStoragePermission: boolean;
  hasContactPermission: boolean;
};

const initialState: PermissionContext = {
  hasStoragePermission: false,
  hasContactPermission: false,
};

export const PermissionContext = createContext(initialState);

export const usePermission = () => useContext(PermissionContext);
const PermissionProvider = ({children}: {children: React.ReactNode}) => {
  const [hasStoragePermission, setHasStoragePermission] = useState(false);
  const [hasContactPermission, setHasContactPermission] = useState(false);

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

    if (hasContactPermission) setHasContactPermission(hasContactPermission);
    else request.push(contactPermission);

    if (hasStoragePermission) setHasStoragePermission(hasStoragePermission);
    else request.push(storagePermission);

    if (request.length > 0) {
      const status = await PermissionsAndroid.requestMultiple(request);
      if (status[contactPermission])
        setHasContactPermission(status[contactPermission] === 'granted');
      if (status[storagePermission])
        setHasContactPermission(status[storagePermission] === 'granted');
    }
  }, []);

  useEffect(() => {
    checkAndroidPermission();
  }, []);

  return (
    <PermissionContext.Provider
      value={{
        hasStoragePermission,
        hasContactPermission,
      }}>
      {children}
    </PermissionContext.Provider>
  );
};

export default PermissionProvider;
