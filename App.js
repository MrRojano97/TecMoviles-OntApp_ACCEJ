import React from 'react';
import { LogBox} from 'react-native'
import { NavigatorStack } from './routes/NavigatorStack';
import { Provider as PaperProvider } from 'react-native-paper';

LogBox.ignoreLogs(["Setting a timer"])

export default function App() {
  return (
    <PaperProvider>
      <NavigatorStack/>
    </PaperProvider>
    
  );
}

