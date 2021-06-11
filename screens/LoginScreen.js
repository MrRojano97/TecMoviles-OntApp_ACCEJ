import { TextInput, Button, Text, Snackbar } from 'react-native-paper';
import * as React from 'react';
import { View } from 'react-native';
import styles from '../styles/styles';
import { auth } from '../database/firebase';

export const LoginScreen = (props) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(null);
  const [errormsg, setErrormsg] = React.useState('');

  function validation() {
    if (username == '') {
      setErrormsg('Ingresa un email');
      setError(true);
      return false;
    } else if (password == '') {
      setErrormsg('Ingresa una contraseña');
      setError(true);
      return false;
    } else {
      return true;
    }
  }
  function handleOnSubmit(e) {
    e.preventDefault();
    if (validation()) {
      auth
        .signInWithEmailAndPassword(username, password)
        .then(() => props.navigation.navigate('rutas'))
        .catch(() => {
          setErrormsg('Error en los datos');
          setError(true);
        });
    }
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {error == true && (
        <Snackbar
          visible={error}
          onDismiss={() => setError(false)}
          action={{
            label: 'X',

            onPress: () => {
              setError(false);
              console.log('asdadads');
            }
          }}>
          {errormsg}
        </Snackbar>
      )}

      <View style={{ height: '40%', justifyContent: 'center' }}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: '600',
            alignSelf: 'center'
          }}>
          Login
        </Text>
      </View>
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
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextInput
          style={{ marginTop: 20 }}
          label='Password'
          secureTextEntry
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          style={{ margin: 20 }}
          contentStyle={{ height: 50 }}
          mode='contained'
          onPress={handleOnSubmit}>
          Ingresar
        </Button>
      </View>
    </View>
  );
};
