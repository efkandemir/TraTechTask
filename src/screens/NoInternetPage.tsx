import { Text, SafeAreaView, StatusBar } from 'react-native';
import React from 'react';

const NoInternetPage: React.FC = () => (
  <SafeAreaView className="flex-1 justify-center items-center bg-white px-3">
    <StatusBar barStyle="dark-content" backgroundColor="white" />
    <Text className="text-red-600 text-lg font-semibold text-center mb-2">
      İnternet bağlantısı yok
    </Text>
    <Text className="text-gray-500 text-center">
      Lütfen bağlantınızı kontrol edin.
    </Text>
  </SafeAreaView>
);

export default NoInternetPage;
