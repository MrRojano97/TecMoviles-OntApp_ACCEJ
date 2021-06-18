import React from 'react';
import { NavigatorStack } from './routes/NavigatorStack';
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
      <NavigatorStack/>
    </PaperProvider>
    
  );
}

