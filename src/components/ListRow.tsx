import { View, Text } from 'react-native';
import React from 'react';

type ListRowProps = {
  price: number | string;
  amount: number | string;
  total: number | string;
  index: number;
  colorScheme: 'buying' | 'sales';
};

const ListRow: React.FC<ListRowProps> = ({
  price,
  amount,
  total,
  index,
  colorScheme,
}) => {
  const isBuyingPage = colorScheme === 'buying';

  const backgroundColor =
    index % 2 === 0 ? (isBuyingPage ? '#e06666' : '#6aa84f') : 'white';

  return (
    <View
      className="flex-row justify-between px-2 py-2 border-b"
      style={{ backgroundColor }}
    >
      <Text className="text-black w-1/3">
        $
        {price}
      </Text>
      <Text className="text-black w-1/3 text-center">{amount}</Text>
      <Text className="text-black w-1/3 text-right">{total}</Text>
    </View>
  );
};

export default ListRow;
