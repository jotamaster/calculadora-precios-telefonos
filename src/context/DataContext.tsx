import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PhoneModel } from '../types';

interface DataContextType {
  phoneModels: PhoneModel[];
  setPhoneModels: (models: PhoneModel[]) => void;
  hasData: boolean;
  setHasData: (hasData: boolean) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [phoneModels, setPhoneModels] = useState<PhoneModel[]>([]);
  const [hasData, setHasData] = useState(false);

  return (
    <DataContext.Provider value={{
      phoneModels,
      setPhoneModels,
      hasData,
      setHasData,
    }}>
      {children}
    </DataContext.Provider>
  );
}; 