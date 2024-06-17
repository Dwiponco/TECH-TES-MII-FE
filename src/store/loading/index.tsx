import { createContext, useContext, useState, FC, ReactNode } from 'react';

interface LoadingContextProps {
  loading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

const LoadingContext = createContext<LoadingContextProps | undefined>(undefined);

export const useLoadingContext = (): LoadingContextProps => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoadingContext must be used within a LoadingContextProvider');
  }
  return context;
};

export const LoadingContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  return (
    <LoadingContext.Provider value={{ loading, startLoading, stopLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};