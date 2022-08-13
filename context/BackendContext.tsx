import {createContext, useCallback, useContext} from 'react';

export const BackendContext = createContext({});

export const useApp = () => useContext(BackendContext);

const BackendProvider = ({children}: {children: React.ReactNode}) => {
  const getAvailableUsers = useCallback((numbers: string[]) => {
    fetch('');
  }, []);

  const createUser = useCallback(() => {}, []);

  return (
    <BackendContext.Provider value={{}}>{children}</BackendContext.Provider>
  );
};
