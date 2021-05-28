import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LoginScreen } from './screens/LoginScreen';
import { GaleriaScreen } from './screens/GaleriaScreen';
import { RutasScreen } from './screens/RutasScreen';
import { MapaScreen } from './screens/MapaScreen';
import { NuevoObjetoScreen } from './screens/NuevoObjetoScreen';

function MyStack(){
  const Stack = createStackNavigator()
  return (
    <Stack.Navigator>
      <Stack.Screen name="login" component={LoginScreen}/>
      <Stack.Screen name="rutas" component={RutasScreen}/>
      <Stack.Screen name="galeria" component={GaleriaScreen}/>
      <Stack.Screen name="mapa" component={MapaScreen}/>
      <Stack.Screen name="nuevo" component={NuevoObjetoScreen}/>
    </Stack.Navigator>
  )
}
export default function App() {
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}

