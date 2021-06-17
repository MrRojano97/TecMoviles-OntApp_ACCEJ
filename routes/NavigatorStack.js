import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import { Loading } from '../components/Loading';
import { GaleriaScreen } from '../screens/GaleriaScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { MapaScreen } from '../screens/MapaScreen';
import { NuevoObjetoScreen } from '../screens/NuevoObjetoScreen';
import { ObjetoScreen } from '../screens/ObjetoScreen/ObjetoScreen';
import { RegisterScreen } from '../screens/RegisterScreen'
import { RutasScreen } from '../screens/RutasScreen';


/**
 * Componente funcional que contiene las rutas de las vistas, empaquedatas en un navigation container.
 * React navigaton utiliza el name de cada componente como idenficador. Cuando se dirige hacia una vista, 
 * se debe usar el name como parametro. Consultar ejemplos en screen/RutasScreen.js
 * @returns Un navigation container con un stack de vistas disponibles para comenzar a navegar.
 */
export const NavigatorStack = () => {
    const Stack = createStackNavigator()
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown:false,         
        }}>
          <Stack.Screen name="rutas" component={RutasScreen}/>
          <Stack.Screen name="login" component={LoginScreen}/>
          <Stack.Screen name="galeria" component={GaleriaScreen}/>
          <Stack.Screen name="mapa" component={MapaScreen}/>
          <Stack.Screen name="nuevo" component={NuevoObjetoScreen}/>
          <Stack.Screen name="objeto" component={ObjetoScreen}/>
          <Stack.Screen name="cargando" component={Loading}/>
          <Stack.Screen name="registro" component={RegisterScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
}
