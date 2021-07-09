import { TextInput, Button, Text, Snackbar } from 'react-native-paper';
import * as React from 'react';
import { Alert, Platform, View } from 'react-native';
import { auth } from '../firebase';

export const RegisterScreen = (props) => {
  const [name, setName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [info, setInfo] = React.useState(null);
  const [infomsg, setInfomsg] = React.useState('');

  function validation() {
    if (username == '') {
      setInfomsg('Ingresa un email');
      setInfo(true);
      return false;
    } else if (password == '') {
      setInfomsg('Ingresa una contraseña');
      setInfo(true);
      return false;
    } else if (name == '') {
      setInfomsg('Ingresa un nombre');
      setInfo(true);
      return false;
    } else {
      return true;
    }
  }
  function registroFirebase(e) {
    e.preventDefault();
    if (validation()) {
      auth
        .createUserWithEmailAndPassword(username, password)
        //.then(() => props.navigation.navigate('rutas'))
        .catch(() => {
          setInfomsg('Compruebe los datos ingresados o ya estás registrado');
          setInfo(true);
        });
      console.log(name, username, password);
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
        <Text
          style={{
            fontSize: 25,
            fontWeight: '600',
            alignSelf: 'center'
          }}>
          Registro
        </Text>
      </View>

      <View
        style={{
          height: '60%',
          width: '85%',
          alignSelf: 'center',
          marginTop: 10
        }}>
        <TextInput
          style={{ marginTop: 10 }}
          label='Nombre'
          value={name}
          onChange={(e) => setName(e.nativeEvent.text)}
        />

        <TextInput
          style={{ marginTop: 10 }}
          label='Email'
          value={username}
          onChange={(e) => setUsername(e.nativeEvent.text)}
        />

        <TextInput
          style={{ marginTop: 10 }}
          label='Contraseña'
          secureTextEntry
          value={password}
          onChange={(e) => setPassword(e.nativeEvent.text)}
        />

        <Button
          style={{ margin: 20 }}
          contentStyle={{ height: 50 }}
          mode='contained'
          onPress={handleOnSubmit}>
          Registrarse
        </Button>
      </View>
    </View>
  );
};
