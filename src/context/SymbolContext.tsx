import React, { createContext, useState, useMemo } from 'react';

type SymbolContextType = {
  selectedSymbol: string;
  setSelectedSymbol: React.Dispatch<React.SetStateAction<string>>;
};

export const SymbolContext = createContext<SymbolContextType>({
  selectedSymbol: 'BTC/USD',
  setSelectedSymbol: () => {},
});

export const SymbolProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedSymbol, setSelectedSymbol] = useState('BTC/USD');

  const value = useMemo(() => ({ selectedSymbol, setSelectedSymbol }), [selectedSymbol]);

  return (
    <SymbolContext.Provider value={value}>
      {children}
    </SymbolContext.Provider>
  );
};
