import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from '@expo/vector-icons/AntDesign';
import BuyingPage from '../screens/BuyingPage';
import SalesPage from '../screens/SalesPage';

const Tab = createBottomTabNavigator();

const BuyIcon = ({ focused }: { focused: boolean }) => (
  <AntDesign
    name="arrowdown"
    size={24}
    color={focused ? '#EF4444' : '#000000'}
  />
);

const SellIcon = ({ focused }: { focused: boolean }) => (
  <AntDesign
    name="arrowup"
    size={24}
    color={focused ? '#10B981' : '#000000'}
  />
);

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        height: 65,
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
      },
      tabBarLabelStyle: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        color: 'black',
      },
    }}
  >
    <Tab.Screen
      name="Alış Emirleri"
      component={BuyingPage}
      options={{
        tabBarLabel: 'Alış',
        tabBarIcon: BuyIcon,
      }}
    />

    <Tab.Screen
      name="Satış Emirleri"
      component={SalesPage}
      options={{
        tabBarLabel: 'Satış',
        tabBarIcon: SellIcon,
      }}
    />
  </Tab.Navigator>
);

export default TabNavigator;
