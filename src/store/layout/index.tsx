import React, { createContext, useContext, useState } from 'react';

interface LayoutContextType {
  isCollapse: boolean;
  setIsCollapse: React.Dispatch<React.SetStateAction<boolean>>;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayoutContext must be used within a LayoutProvider');
  }
  return context;
};

interface LayoutProviderProps {
  children: React.ReactNode;
}

export const LayoutProvider: React.FC<LayoutProviderProps> = ({ children }) => {
  const [isCollapse, setIsCollapse] = useState(false);

  return (
    <LayoutContext.Provider value={{ isCollapse, setIsCollapse }}>
      {children}
    </LayoutContext.Provider>
  );
};
