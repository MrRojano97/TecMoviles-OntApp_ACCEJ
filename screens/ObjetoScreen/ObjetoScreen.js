import React from 'react'
import { Text, View, ScrollView, Dimensions, Image } from 'react-native'
import CarruselImages from '../../components/CarruselImages'
import styles from '../../styles/styles'
import  Map from '../../components/Map'
import { ListItem, Icon } from 'react-native-elements'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BarOptions } from './BarOptions'
import dimensions from '../../styles/dimensions'
import { useState } from 'react'
import { EditScreen } from './EditScreen'
import { db } from '../../firebase'

export const ObjetoScreen = ({navigation,route}) => {
  const {top} = useSafeAreaInsets()
  const [optionVisible, setOptionVisible] = useState(false)
  const [editVisible, setEditVisible] = useState(false);
  const showEdit = () => {
    setOptionVisible(false)
    setEditVisible(true)
  }
  const { item } = route.params;

  // const showEdit = () => setEditVisible(true);
  const hideEdit = () => {
    const usersCollection = db.collection('Objetos').doc(item.id).get().then((data) => {
      var datos = data.data();
      item.nombredeobjeto = datos.nombredeobjeto;
      item.descripciondeobjeto = datos.descripciondeobjeto;
      item.direccion = datos.direccion;
      setEditVisible(false)
  });
  };


  const objectJSON = {
    nombre:"Nintendo Nes",
    descripcion:"La Nintendo Nes que he tenido toda mi vida, si se me pierde sufrire.",
    location:{
      latitude:34.9639627550312, 
      longitude:71.22632910354261,
      latitudeDelta:0.04,
      longitudDelta:0.03
    },
    direccion:"Avenida Siempre Viva N° 742"
  }
  const imagesObject = [
    "../../assets/nes.jpg","../../assets/nes2.jpg", "../../assets/nes3.jpg"
  ]
  
  const TituloObjeto = ({nombre,descripcion}) =>{
    return (
      <View style={{padding:15}}>
        <View style={{flexDirection:"row"}}>
          <Text style={styles.objectTitle}>{nombre}</Text>
        </View>
        <Text style={styles.objectDescription}>{descripcion}</Text>
      </View>
    )
  }
  const ObjectInfo  = ({location, nombre, direccion}) =>{

    const listInfo =[
      {
        text:direccion,
        iconName:"map-marker",
        iconType:"material-community",
        action:null
      },
      {
        text:"Pepito Perez",
        iconName:"account",
        iconType:"material-community",
      }
    ]
    
    return(
      <View style={styles.objectInfo}>
        <Text style={styles.objectInfoTitle}>Informacion sobre el objeto</Text>
        {/* <Map
          location={location} 
          nombre={nombre}
          height={100}
        /> */}
        <Image
          style={{height:100, width:dimensions.width-30, marginBottom:5}}
          source={require("../../assets/map.jpg")}
        />
        <View>
          <ListItem 
            bottomDivider
            >
            <Icon name={listInfo[0].iconName} type={listInfo[0].iconType}/>
            <ListItem.Content>
              <ListItem.Title>
                {listInfo[0].text}
              </ListItem.Title>
            </ListItem.Content>      
          </ListItem>

          <ListItem 
            bottomDivider
            >
            <Icon name={listInfo[1].iconName} type={listInfo[1].iconType}/>
            <ListItem.Content>
              <ListItem.Title>
                {listInfo[1].text}
              </ListItem.Title>
            </ListItem.Content>      
          </ListItem>
        </View>
        
      </View>
    )
  }
  return (
    <ScrollView vertical style={styles.objectViewBody, {top:top}} >
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
        />
      {/* <CarruselImages
        arrayImages={imagesObject}
        height={250}
        width={ScreenWidth}
      >
      </CarruselImages> */}
      <Image
          style={styles.objectImage}
          source={require("../../assets/nes2.jpg")}
      />
      <TituloObjeto 
        nombre="Descripción"
        descripcion={item.descripciondeobjeto}
      />
      <ObjectInfo
        location={item.location}
        nombre={item.nombredeobjeto}
        direccion={item.direccion}
      />
    </ScrollView>
  )
}
