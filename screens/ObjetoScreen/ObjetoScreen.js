import React from 'react';
import { Text, View, ScrollView, Image, Button } from 'react-native';
import styles from '../../styles/styles';
import { ListItem, Icon } from 'react-native-elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BarOptions } from './BarOptions';
import { useState } from 'react';
import { EditScreen } from './EditScreen';
import { db } from '../../firebase';
import MapObjeto from '../../components/MapObjeto';
import { Audio } from 'expo-av';
export const ObjetoScreen = ({ navigation, route }) => {
  const { top } = useSafeAreaInsets();
  const [optionVisible, setOptionVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  // const [sound, setSound] = React.useState();
  const showEdit = () => {
    setOptionVisible(false);
    setEditVisible(true);
  };
  const { item, userData } = route.params;

  async function playSound(e) {
    e.preventDefault();
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
      { uri: item.urlAudio },
      {},
      true
    );
    // setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  // const showEdit = () => setEditVisible(true);
  const hideEdit = () => {
    db.collection('Objetos')
      .doc(item.idObjeto)
      .get()
      .then((data) => {
        var datos = data.data();
        item.nombredeobjeto = datos.nombredeobjeto;
        item.descripciondeobjeto = datos.descripciondeobjeto;
        item.direccion = datos.direccion;
        setEditVisible(false);
      });
  };

  const TituloObjeto = ({ nombre, descripcion }) => {
    return (
      <View style={{ padding: 15 }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.objectTitle}>{nombre}</Text>
        </View>
        <Text style={styles.objectDescription}>{descripcion}</Text>
      </View>
    );
  };
  const ObjectInfo = ({ location, nombre, direccion }) => {
    const listInfo = [
      {
        text: direccion,
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
        {/* <Image
          style={{height:100, width:dimensions.width-30, marginBottom:5}}
          source={require("../../assets/map.jpg")}
        /> */}
        <MapObjeto item={item} />
        <View>
          <ListItem bottomDivider>
            <Icon name={listInfo[0].iconName} type={listInfo[0].iconType} />
            <ListItem.Content>
              {/* <ListItem.Title>
                {listInfo[0].text}
              </ListItem.Title> */}
              {/* <RemoteSound
                item = {item}
              /> */}
              <Button title='Play Sound' onPress={playSound} />
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
  return (
    <ScrollView vertical style={(styles.objectViewBody, { top: top })}>
      <EditScreen
        editVisible={editVisible}
        showEdit={showEdit}
        hideEdit={hideEdit}
        objectJSON={item}
      />
      <BarOptions
        nombreoObjeto={item.nombredeobjeto}
        showEdit={showEdit}
        optionVisible={optionVisible}
        setOptionVisible={setOptionVisible}
        item={item}
        navigation={navigation}
      />

      <Image style={styles.objectImage} source={{ uri: item.urlObjeto }} />
      <TituloObjeto
        nombre='Descripción'
        descripcion={item.descripciondeobjeto}
      />
      <ObjectInfo
        location={item.location}
        nombre={item.nombredeobjeto}
        direccion={item.direccion}
      />
    </ScrollView>
  );
};
