import React from 'react';
import { LogBox, View } from 'react-native';
import { NavigatorStack } from './routes/NavigatorStack';
import { Button, Provider as PaperProvider } from 'react-native-paper';
import { Version2 } from './Version2';

LogBox.ignoreLogs(['Setting a timer']);

/*
Version1 : Version con los archivos originales
Version2 : Version con archivos modificados para mantener la sesión iniciada

*/

export default function App() {
  function Version1() {
    return (
      <PaperProvider>
        <NavigatorStack />
      </PaperProvider>
    );
  }
  return <Version2 />;
}
