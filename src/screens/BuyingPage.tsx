import React, { useEffect, useState, useCallback, useContext } from 'react';
import NetInfo from '@react-native-community/netinfo';
import KrakenBookData from '../services/KrakenBookData';
import { SYMBOL_ITEMS } from '../constants/Symbols';
import BidAskPage from './BidAskPage';
import { SymbolContext } from '../context/SymbolContext';

const BuyingPage: React.FC = () => {
  const { selectedSymbol, setSelectedSymbol } = useContext(SymbolContext);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const { bids, refetch } = KrakenBookData(selectedSymbol);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected && state.isInternetReachable !== false);
    });
    return () => unsubscribe();
  }, []);

  const handleRefetch = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <BidAskPage
      title="ALIŞ İŞLEMLERİ"
      data={bids}
      refetch={refetch}
      selectedSymbol={selectedSymbol}
      setSelectedSymbol={setSelectedSymbol}
      SYMBOL_ITEMS={SYMBOL_ITEMS}
      isLoading={bids.length === 0}
      isConnected={isConnected}
      handleRefetch={handleRefetch}
    />
  );
};

export default BuyingPage;
