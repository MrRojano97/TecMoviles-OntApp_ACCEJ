import React from 'react';
import { Text, View, ScrollView, Dimensions, Image } from 'react-native';
import CarruselImages from '../../components/CarruselImages';
import styles from '../../styles/styles';
import Map from '../../components/Map';
import { ListItem, Icon } from 'react-native-elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BarOptions } from '../ObjetoScreen/BarOptions';
import dimensions from '../../styles/dimensions';
import { useState } from 'react';

import { db } from '../../firebase';

import themeTextInput from '../../styles/ThemeTextInput';
import {
  Button,
  Divider,
  FAB,
  IconButton,
  Modal,
  Portal,
  Provider,
  TextInput
} from 'react-native-paper';

export const ObjetoScreenAlternativo = ({ navigation, route }) => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;
  const { top } = useSafeAreaInsets();
  const [optionVisible, setOptionVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [imagen, setimagen] = useState(null);
  const showEdit = () => {
    setOptionVisible(false);
    setEditVisible(true);
  };

  const { userData, item } = route.params;

  const hideEdit = () => {
    setOptionVisible(false);
    setEditVisible(false);
  };

  const objectJSON = {
    nombre: 'Nintendo Nes',
    descripcion:
      'La Nintendo Nes que he tenido toda mi vida, si se me pierde sufrire.',
    location: {
      latitude: 34.9639627550312,
      longitude: 71.22632910354261,
      latitudeDelta: 0.04,
      longitudDelta: 0.03
    },
    direccion: 'Avenida Siempre Viva N° 742'
  };
  const imagesObject = [
    '../../assets/nes.jpg',
    '../../assets/nes2.jpg',
    '../../assets/nes3.jpg'
  ];

  const TituloObjeto = () => {
    return (
      <View style={{ padding: 15, alignItems: 'center' }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.objectTitle}>{item.nombredeobjeto}</Text>
        </View>
        <Text style={styles.objectDescription}>{item.descripciondeobjeto}</Text>
      </View>
    );
  };
  const ObjectInfo = () => {
    const listInfo = [
      {
        text: 'agregar Coordenadas',
        iconName: 'map-marker',
        iconType: 'material-community',
        action: null
      },
      {
        text: userData.name,
        iconName: 'account',
        iconType: 'material-community'
      }
    ];

    return (
      <View style={styles.objectInfo}>
        <Text style={styles.objectInfoTitle}>Informacion sobre el objeto</Text>
        {/* <Map
          location={location} 
          nombre={nombre}
          height={100}
        /> */}

        <Image
          style={{
            height: 100,
            width: dimensions.width - 50,
            marginBottom: 5
          }}
          source={require('../../assets/map.jpg')}
        />
        <View>
          <ListItem bottomDivider>
            <Icon name={listInfo[0].iconName} type={listInfo[0].iconType} />
            <ListItem.Content>
              <ListItem.Title>{listInfo[0].text}</ListItem.Title>
            </ListItem.Content>
          </ListItem>

          <ListItem bottomDivider>
            <Icon name={listInfo[1].iconName} type={listInfo[1].iconType} />
            <ListItem.Content>
              <ListItem.Title>{listInfo[1].text}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </View>
      </View>
    );
  };

  const [descripcion, setDescripcion] = useState(item.descripciondeobjeto);
  const [nombre, setNombre] = useState(item.nombredeobjeto);
  const [direccion, setDireccion] = useState('');

  function handleOnSubmit() {
    db.collection('Objetos')
      .doc(item.idObjeto)
      .update({
        nombredeobjeto: nombre,
        descripciondeobjeto: descripcion,
        direccion: direccion
      })
      .then(() => {
        console.log('Objeto actualizado');
      });
    hideEdit();
  }

  function eliminar(e) {
    e.preventDefault();
    db.collection('Objetos').doc(item.idObjeto).delete();
    alert('Objeto eliminado');
    navigation.navigate('Inicio');
  }

  return (
    <Provider>
      <Portal>
        <ScrollView vertical style={{ backgroundColor: '#65A0FF' }}>
          {/* <CarruselImages
        arrayImages={imagesObject}
        height={250}
        width={ScreenWidth}
      >
      </CarruselImages> */}

          <View
            style={{
              backgroundColor: 'white',
              marginVertical: 10,
              margin: 10,
              paddingVertical: 40
            }}>
            <TituloObjeto />

            <Image
              style={styles.objectImage}
              source={{ uri: item.urlObjeto }}
            />

            <ObjectInfo />
            <Button onPress={(e) => showEdit()}>Editar</Button>
            <Button onPress={eliminar}>Eliminar</Button>
          </View>
        </ScrollView>
        <Modal
          visible={editVisible}
          onDismiss={hideEdit}
          contentContainerStyle={{ backgroundColor: 'white', padding: 10 }}>
          <Text style={{ fontSize: 20, padding: 10 }}>Editar Objeto</Text>
          <Divider />
          <View style={{ marginTop: 10 }}>
            <TextInput
              style={{ marginBottom: 10 }}
              TextInput
              label='Nombre'
              value={nombre}
              onChangeText={(text) => setNombre(text)}
              theme={themeTextInput}></TextInput>
            <TextInput
              style={{ marginBottom: 10 }}
              TextInput
              label='Descripción'
              value={descripcion}
              onChangeText={(text) => setDescripcion(text)}
              theme={themeTextInput}></TextInput>
            <TextInput
              TextInput
              label='Dirección'
              value={direccion}
              onChangeText={(text) => setDireccion(text)}
              theme={themeTextInput}></TextInput>
          </View>
          <View
            style={{
              width: dimensions.width - 20,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center'
            }}>
            <IconButton
              icon='check'
              color='green'
              size={30}
              onPress={handleOnSubmit}
            />
            <IconButton
              icon='cancel'
              color='red'
              size={30}
              onPress={hideEdit}
            />
          </View>
        </Modal>
      </Portal>
    </Provider>
  );
};
