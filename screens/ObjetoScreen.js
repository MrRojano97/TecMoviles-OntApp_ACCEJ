import React from 'react'
import { Text, View, ScrollView, Dimensions, Image } from 'react-native'
import CarruselImages from '../components/CarruselImages'
import styles from '../styles/styles'
import  Map from '../components/Map'
import { ListItem, Icon } from 'react-native-elements'
export const ObjetoScreen = () => {
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
    "../assets/nes.jpg","../assets/nes2.jpg", "../assets/nes3.jpg"
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
          style={styles.objectImage}
          source={require("../assets/map.jpg")}
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
          {/* {listInfo.map((item)=>{
            <ListItem 
              bottomDivider
              >
              <Icon name={item.iconName}/>
              <ListItem.Content>
                <ListItem.Title>
                  {item.text}
                </ListItem.Title>
              </ListItem.Content>      
            </ListItem>
          })} */}
        </View>
        
      </View>
    )
  }
  return (
    <ScrollView vertical style={styles.objectViewBody} >
      {/* <CarruselImages
        arrayImages={imagesObject}
        height={250}
        width={ScreenWidth}
      >
      </CarruselImages> */}
      <Image
          style={styles.objectImage}
          source={require("../assets/nes2.jpg")}
      />
      <TituloObjeto 
        nombre={objectJSON.nombre}
        descripcion={objectJSON.descripcion}
      />
      <ObjectInfo
        location={objectJSON.location}
        nombre={objectJSON.nombre}
        direccion={objectJSON.direccion}
      />
     
    </ScrollView>
  )
}
