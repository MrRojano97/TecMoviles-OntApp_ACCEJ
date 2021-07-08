import { TextInput, Text, Button, Snackbar, ContainedButton, Colors } from 'react-native-paper';
import { SocialIcon} from 'react-native-elements';
import themeTextInput from '../styles/ThemeTextInput';
import { Alert, Platform, View, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';
import React, { useState, useEffect } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import SocialButton from '../components/SocialButton';
import * as Google from 'expo-google-app-auth';
import {auth} from '../firebase';
import { Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import dimensions from '../styles/dimensions';

export const LoginScreen = (props) => {
  const {top} = useSafeAreaInsets()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [info, setInfo] = useState(null);
  const [infomsg, setInfomsg] = useState('');
  const [googleSubmitting, setGoogleSubmitting] = useState(false);

  function validation() {
    if (username == '') {
      setInfomsg('Ingresa un email');
      setInfo(true);
      return false;
    } else if (password == '') {
      setInfomsg('Ingresa una contraseña');
      setInfo(true);
      return false;
    } else {
      return true;
    }
  }
  function handleOnSubmit(e) {
    e.preventDefault();
    console.log(username, password);
    if (validation()) {
      auth
        .signInWithEmailAndPassword(username, password)
        .then(() => props.navigation.navigate('dashboard'))
        .catch(() => {
          setInfomsg('Error en los datos');
          setInfo(true);
        });
    }
  }

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
  const Sensor = () => {
    let [compatible, setcompatible] = useState(false);
    let [fingerprints, setfingerprints] = useState(false);
    let [result, setresult] = useState('');

    useEffect(() => {
      checkDeviceForHardware();
      checkForFingerprints();
    }, []);

    async function checkDeviceForHardware() {
      setcompatible(await LocalAuthentication.hasHardwareAsync());
    }

    async function checkForFingerprints() {
      setfingerprints(await LocalAuthentication.isEnrolledAsync());
    }

    async function scanFingerprint() {
      let result = await LocalAuthentication.authenticateAsync(
        'Scan your finger.'
      );
      setresult('Acceso verificado');
      props.navigation.navigate('dashboard');
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
          <Button color='#2B5F8A'
            icon="fingerprint"
            style={{ alignSelf: 'center'}}
            contentStyle={{ height: 50}}
            mode='outlined'>
              Ingresar con Huella
          </Button>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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

      <View style={{ height: '42%', justifyContent: 'center'}}>
        
        <Image
            style={{marginTop:top,width:dimensions.width,resizeMode:'center',top:top}}
            source={require("../assets/Ontapp_Top2.png")}
          />
      </View>

      {Platform.OS == 'android' ? (
        <View>
          <SocialButton/>
          <SocialIcon
            title={"Iniciar Sesión con Facebook"}
            button={true}
            type={"facebook"}
            onPress={AuthGoogle}    
          />
          <SocialIcon
            title={"Iniciar Sesión con Google"}
            button={true}
            type={"google"}
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
        <TextInput theme={themeTextInput}
          label='Correo Electrónico'
          value={username}
          onChange={(e) => setUsername(e.nativeEvent.text)}
        />

        <TextInput theme={themeTextInput}
          style={{ marginTop: 10, color: 'blue'}}
          label='Contraseña'
          secureTextEntry
          value={password}
          onChange={(e) => setPassword(e.nativeEvent.text)}
        />

        <Button color='#3B83BD'
          style={{ margin: 20}}
          contentStyle={{ height: 50}}
          icon="login"
          mode='contained'
          onPress={handleOnSubmit}>
          Ingresar
        </Button>

        <Sensor />
        <Button color='#132A3D'
          style={{margin: 13, width: 200, alignSelf: 'center'}}
          contentStyle={{ height: 50,  }}
          icon="account"
          mode='text'
          onPress={handleOnSubmit}>
          Registrarse
        </Button>
      </View>
    </View>
  );
};
