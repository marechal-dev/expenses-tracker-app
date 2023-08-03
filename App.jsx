import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';

import { StackNavigation } from './src/navigation/stack-navigation';
import { ExpensesProvider } from './src/store/context/expenses-context';

export default function App() {
  return (
    <>
      <StatusBar
        translucent
        style="light"
      />
      <ExpensesProvider>
        <NavigationContainer>
          <StackNavigation />
        </NavigationContainer>
      </ExpensesProvider>
    </>
  );
}