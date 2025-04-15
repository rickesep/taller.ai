import React from 'react';
import { StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <PaperProvider>
      <StatusBar barStyle="dark-content" />
      <AppNavigator />
    </PaperProvider>
  );
};

export default App; 