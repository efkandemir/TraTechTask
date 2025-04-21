import React, { useState } from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  ActivityIndicator,
  StatusBar,
  Pressable,
  Image,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Ionicons } from '@expo/vector-icons';
import ListRow from '../components/ListRow';
import NoInternetPage from './NoInternetPage';

type BidAskPageProps = {
  title: string;
  data: { price: number; qty: number }[];
  refetch: () => void;
  selectedSymbol: string;
  setSelectedSymbol: React.Dispatch<React.SetStateAction<string>>;
  SYMBOL_ITEMS: { label: string; value: string }[];
  isLoading: boolean;
  isConnected: boolean | null;
  handleRefetch: () => void;
};

const BidAskPage: React.FC<BidAskPageProps> = ({
  title,
  data,
  refetch,
  selectedSymbol,
  setSelectedSymbol,
  SYMBOL_ITEMS,
  isLoading,
  isConnected,
  handleRefetch,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [items, setItems] = useState(SYMBOL_ITEMS);

  if (!isConnected) {
    return <NoInternetPage />;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View className="flex-row items-center justify-between mb-5 mt-5">
        <View className="w-1/6 items-start ml-3">
          <Image
            source={require('../../assets/images/tratech.png')}
            className="w-10 h-10"
            resizeMode="contain"
          />
        </View>
        <View className="flex-1 items-center ml-7">
          <Text className="text-lg font-bold text-center">{title}</Text>
        </View>
        <View className="w-[120px] mr-1 mb-2">
          <DropDownPicker
            open={open}
            value={selectedSymbol}
            items={items}
            setOpen={setOpen}
            setValue={setSelectedSymbol}
            setItems={setItems}
            placeholder="Select Symbol"
            dropDownDirection="AUTO"
            style={{ borderColor: '#ccc', height: 40 }}
            dropDownContainerStyle={{ borderColor: '#ccc' }}
          />
        </View>
      </View>

      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <>
          <View className="flex-row justify-between border-b border-gray-200 mb-2 p-3">
            <Text className="font-bold w-1/3">PRICE</Text>
            <Text className="font-bold w-1/3 text-center">AMOUNT</Text>
            <Text className="font-bold w-1/3 text-right">TOTAL</Text>
          </View>
          <FlatList
            data={data}
            keyExtractor={(item, index) => `${item.price}${index}`}
            renderItem={({ item, index }) => {
              const total = (item.price * item.qty).toFixed(2);
              return (
                <ListRow
                  price={item.price.toString()}
                  amount={item.qty.toString()}
                  total={total}
                  index={index}
                  colorScheme={title === 'ALIŞ İŞLEMLERİ' ? 'buying' : 'sales'}
                />
              );
            }}
          />
        </>
      )}

      <Pressable
        onPress={handleRefetch}
        className="absolute bottom-5 right-5 bg-gray-200 rounded-full p-4 shadow-lg"
      >
        <Ionicons name="refresh" size={24} color="black" />
      </Pressable>
    </SafeAreaView>
  );
};

export default BidAskPage;
