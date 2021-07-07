import React, { useState, useEffect, useCallback, useContext } from 'react';
import {
  LogBox,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { SocialIcon } from 'react-native-elements';
import SocialButton from './components/SocialButton';
import * as LocalAuthentication from 'expo-local-authentication';
import {
  Button,
  TextInput,
  Card,
  Title,
  Paragraph,
  FAB,
  Portal,
  Provider,
  Text
} from 'react-native-paper';
import dimensions from './styles/dimensions';
import { createStackNavigator } from '@react-navigation/stack';
import { login, logout, onAuthStateChange } from './firebase';
import { NuevoObjetoScreen } from './screens/NuevoObjetoScreen';
import { ObjetoScreen } from './screens/ObjetoScreen/ObjetoScreen';
import colors from './styles/colors';
import { DashboardScreen } from './screens/DashboardScreen';
import { RegisterScreen } from './screens/RegisterScreen';
import { Loading } from './components/Loading';
import { MapaScreen } from './screens/MapaScreen';
import { DashBoardSceenAlternativo } from './screens/alternativeScreens/DashBoardScreenAlternativo';
import { NuevoObjetoScreenAlternativo } from './screens/alternativeScreens/NuevoObjetoScreenAlternativo';
import { ObjetoScreenAlternativo } from './screens/alternativeScreens/ObjetoScreenAlternativo';

const defaultUser = { logIn: false, email: '' };
const UserContext = React.createContext(defaultUser);
const UserProvider = UserContext.Provider;
const UserConsumer = UserContext.Consumer;

LogBox.ignoreLogs(['Setting a timer']);
/*
export default function () {
  return <Loggearse />;
}

*/
export function Version2() {
  const [user, setUser] = useState({
    loggedIn: false,
    sesion: null,
    userData: null
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    };
  }, []);

  const requestLogin = useCallback((username, password) => {
    login(username, password);
  });

  const requestLogout = useCallback(() => {
    logout();
  }, []);

  function LoginView({ onClick }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [info, setInfo] = useState(null);
    const [infomsg, setInfomsg] = useState('');

    const Sensor = () => {
      let [compatible, setcompatible] = useState(false);
      let [fingerprints, setfingerprints] = useState(false);
      let [result, setresult] = useState('');

      /*

      useEffect(() => {
        let isMounted=true
        someAsyncOperation().the
        checkDeviceForHardware();
        checkForFingerprints();
      }, []);

      async function checkDeviceForHardware() {
        setcompatible(await LocalAuthentication.hasHardwareAsync());
      }

      async function checkForFingerprints() {
        setfingerprints(await LocalAuthentication.isEnrolledAsync());
      }

*/
      async function scanFingerprint() {
        let result = await LocalAuthentication.authenticateAsync(
          'Scan your finger.'
        );
        console.log('Ingreso correcto');
      }
      function showAndroidAlert() {
        Alert.alert(
          'Sensor',
          'Coloque su dedo sobre el sensor táctil y presione escanear.',
          [
            {
              text: 'Escanear',
              onPress: () => {
                scanFingerprint();
              }
            },
            {
              text: 'Cancelar',
              onPress: () => console.log('Cancel'),
              style: 'cancel'
            }
          ]
        );
      }

      return (
        <View>
          <TouchableOpacity
            onPress={
              Platform.OS === 'android' ? showAndroidAlert : scanFingerprint
              // Platform.OS === 'android' && scanFingerprint
            }>
            <Button
              color='#2B5F8A'
              icon='fingerprint'
              style={{ alignSelf: 'center' }}
              contentStyle={{ height: 50 }}
              mode='outlined'>
              Ingresar con Huella
            </Button>
          </TouchableOpacity>
        </View>
      );
    };
    function AuthGoogle() {
      setGoogleSubmitting(true);
      const config = {
        androidClientId:
          '19539297272-f73vsuptm488qt92lcsrsq0lt7jgolav.apps.googleusercontent.com',
        scopes: ['profile', 'email']
      };

      Google.logInAsync(config)
        .then((result) => {
          const { type, user } = result;

          if (type == 'success') {
            const { email, name, photoUrl } = user;
            console.log(email, name);
            setInfomsg('Sesión con Google iniciada correctamente', 'SUCCESS');
            setInfo(true);
            //setTimeout(() => navigation.navigate('Welcome',{}))
          } else {
            setInfomsg('El inicio de sesión con Google se ha interrumpido');
            setInfo(true);
          }
          setGoogleSubmitting(false);
        })
        .catch((error) => {
          console.log(error);
          setInfomsg(
            'Ha ocurrido un error, probablemente sea debido a su conexión a Internet'
          );
          setGoogleSubmitting(false);
          setInfo(true);
        });
    }

    return (
      <ScrollView>
        {info == true && (
          <Snackbar
            visible={info}
            onDismiss={() => setInfo(false)}
            action={{
              label: 'X',

              onPress: () => {
                setInfo(false);
                console.log('Mensaje cerrado por el usuario');
              }
            }}>
            {infomsg}
          </Snackbar>
        )}
        <View
          style={{ flex: 0, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ height: '15%', justifyContent: 'center' }}>
            <Image
              style={{
                marginTop: 0,
                width: dimensions.width,
                resizeMode: 'center',
                top: 0
              }}
              source={require('./assets/Ontapp_Top2.png')}
            />
          </View>
          {Platform.OS == 'android' ? (
            <View>
              <SocialButton />
              <SocialIcon
                title={'Iniciar Sesión con Facebook'}
                button={true}
                type={'facebook'}
                onPress={AuthGoogle}
              />
              <SocialIcon
                title={'Iniciar Sesión con Google'}
                button={true}
                type={'google'}
                onPress={AuthGoogle}
              />
            </View>
          ) : null}

          <View
            style={{
              height: '60%',
              width: '85%',
              alignSelf: 'center',
              marginTop: 20
            }}>
            <TextInput
              label='Correo Electrónico'
              value={username}
              onChange={(e) => setUsername(e.nativeEvent.text)}
            />

            <TextInput
              style={{ marginTop: 10, color: 'blue' }}
              label='Contraseña'
              secureTextEntry
              value={password}
              onChange={(e) => setPassword(e.nativeEvent.text)}
            />

            <Button
              color='#3B83BD'
              style={{ margin: 20 }}
              contentStyle={{ height: 50 }}
              icon='login'
              mode='contained'
              onPress={(e) => onClick(username, password)}>
              Ingresar
            </Button>
            <Sensor />
            <Button
              color='#132A3D'
              style={{ margin: 13, width: 200, alignSelf: 'center' }}
              contentStyle={{ height: 50 }}
              icon='account'
              mode='text'>
              Registrarse
            </Button>
          </View>
        </View>
      </ScrollView>
    );
  }
  function RutasVistas({ navigation }) {
    return (
      <ScrollView>
        <View style={{ alignItems: 'center', margin: 10 }}>
          <View>
            <Text>
              Para ver el uso de la variable "user" y obtener los datos del
              usuario pueden guiarse por el código de la funcion "RutaVistas" en
              version2.js
            </Text>
            <Text>Ejemplo variable user con datos de la sesión actual</Text>
            <View style={{ padding: 15 }}>
              <Text>nombre del usuario: {user.userData.name}</Text>
              <Text>uid user firebase: {user.userData.uid}</Text>
              <Text>Correo usuario: {user.userData.correo}</Text>
            </View>
          </View>
        </View>

        <View style={{ alignItems: 'center', margin: 10 }}>
          <Text style={{ justifyContent: 'space-between' }}>
            El dashboard alternativo es el que hice para probar lo de mantener
            sesión iniciada. De ese componente pueden guiarse para obtener los
            datos desde firebase.
          </Text>
          <Button
            onPress={() =>
              navigation.navigate('DashBoardSceenAlternativo', { user: user })
            }>
            Dashboard Alternativo
          </Button>
          <Button
            onPress={() =>
              navigation.navigate('NuevoObjetoAlternativo', {
                userData: user.userData
              })
            }>
            Nuevo Objeto
          </Button>

          <Text style={{ justifyContent: 'space-between' }}>
            Para acceder a la vista del objeto deben ingresar a traves del
            Dashboard ya que se requiere de la id de un objeto del usuario
          </Text>
        </View>
      </ScrollView>
    );

    /* */
  }

  function MyStack() {
    const Stack = createStackNavigator();
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerRight: () => (
              <Button
                style={{ marginEnd: 15 }}
                color={colors.blue_dark}
                onPress={() => requestLogout()}>
                Cerrar sesión
              </Button>
            )
          }}
          name='Inicio'
          component={RutasVistas}
        />

        <Stack.Screen name='NuevoObjeto' component={NuevoObjetoScreen} />
        <Stack.Screen name='Objeto' component={ObjetoScreen} />
        <Stack.Screen name='DashBoard' component={DashboardScreen} />
        <Stack.Screen
          name='DashBoardSceenAlternativo'
          component={DashBoardSceenAlternativo}
        />
        <Stack.Screen name='mapa' component={MapaScreen} />
        <Stack.Screen name='cargando' component={Loading} />
        <Stack.Screen
          name='NuevoObjetoAlternativo'
          component={NuevoObjetoScreenAlternativo}
        />
        <Stack.Screen
          name='ObjetoAlternativo'
          component={ObjetoScreenAlternativo}
        />
      </Stack.Navigator>
    );
  }

  if (!user.loggedIn) {
    return (
      <View>
        <LoginView onClick={requestLogin} />
      </View>
    );
  }
  return (
    <UserProvider value={user}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </UserProvider>
  );
}
