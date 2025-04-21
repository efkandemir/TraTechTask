import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import { SymbolProvider } from '../context/SymbolContext';

export default function RootNavigator() {
  return (
    <SymbolProvider>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </SymbolProvider>
  );
}
