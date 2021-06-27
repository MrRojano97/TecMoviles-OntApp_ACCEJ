import { TextInput, Button, Text, Snackbar } from 'react-native-paper';

import { Alert, Platform, View, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';
import React, { useState, useEffect } from 'react';

import * as LocalAuthentication from 'expo-local-authentication';

import SocialButton from '../components/SocialButton';

import * as Google from 'expo-google-app-auth';
import {auth} from '../firebase';
import { Image } from 'react-native';

export const LoginScreen = (props) => {
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
        .then(() => props.navigation.navigate('rutas'))
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
      props.navigation.navigate('rutas');
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
          }>
          <Button
            style={{ margin: 20 }}
            contentStyle={{ height: 50 }}
            mode='contained'>
            utilizar huella
          </Button>
          <Text style={{ justifyContent: 'center' }}>{result}</Text>
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

      <View style={{ height: '40%', justifyContent: 'center' }}>
        
        <Image
            style={{width:250,resizeMode:'center', marginTop:200}}
            source={require("../assets/logoApp.png")}
          />
        {/* <Text
          style={{
            fontSize: 25,
            fontWeight: '600',
            alignSelf: 'center'
          }}>
          Login
        </Text> */}
      </View>

      {Platform.OS == 'android' ? (
        <View>
          <SocialButton
          //buttonTitle="Iniciar Sesión con Facebook"
          //btnType="facebook"
          //color="#4867aa"
          //backgroundColor="#e6eaf4"
          //onPress={() => {
          //  setInfomsg('Aún no implementado');
          //  setInfo(true);
          //}}
          />

          <SocialButton
            buttonTitle='Iniciar Sesión con Google'
            btnType='google'
            color='#de4d41'
            backgroundColor='#f5e7ea'
            onPress={AuthGoogle}
          />
        </View>
      ) : null}

      <View
        style={{
          height: '60%',
          width: '85%',
          alignSelf: 'center',
          marginTop: 70
        }}>
        <TextInput
          label='Email'
          value={username}
          onChange={(e) => setUsername(e.nativeEvent.text)}
        />

        <TextInput
          style={{ marginTop: 20 }}
          label='Password'
          secureTextEntry
          value={password}
          onChange={(e) => setPassword(e.nativeEvent.text)}
        />
        <Sensor />
        <Button
          style={{ margin: 20 }}
          contentStyle={{ height: 50 }}
          mode='contained'
          onPress={handleOnSubmit}>
          Ingresar
        </Button>

        <View style={{ height: '30%', justifyContent: 'center' }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '300',
              alignSelf: 'center'
            }}>
            Registrarse
          </Text>
        </View>
      </View>
    </View>
  );
};
