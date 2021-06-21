import React, {useStyles} from 'react'
import { Modal, Portal, Text, Button, Provider,TextInput , Divider, IconButton } from 'react-native-paper';
import {StyleSheet, View,Image } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import colors from '../styles/colors'
import { makeStyles } from 'react-native-elements';
import fontSizes from '../styles/fontSizes';
import dimensions from '../styles/dimensions';
import themeTextInput from '../styles/ThemeTextInput';

/**
 * Vista para crear un nuevo objeto en la aplicacion
 * @returns Vista 
 */
export const NuevoObjetoScreen = () => {
  
  const {top} = useSafeAreaInsets()
  return (
    <View style={{flex:1, top:top}}>
      <View style={{height:50, backgroundColor:colors.primaryColor,flexDirection:"row"}}>
          <Text style={{marginLeft:20, 
            color:colors.white, 
            fontWeight:"bold", 
            fontSize:fontSizes.mbig,
            alignSelf:"center",      
            }}>Nuevo Objeto</Text>
        </View>
      <Divider/>
      <View style={{padding:20}}>
        <View style={{marginTop:20, }}>
          <Text style={{fontSize:fontSizes.medium}}>Nombre de objeto</Text>
          <TextInput style={{marginBottom:10}} TextInput theme={themeTextInput} ></TextInput>
          <Text style={{fontSize:fontSizes.medium}}>Descripción</Text>
          <TextInput style={{marginBottom:10}} TextInput theme={themeTextInput}></TextInput>
        </View>
        <View style={{marginBottom:10}}>
          <Text style={{fontSize:fontSizes.medium}}>Ubicación</Text>
          <Image
            style={{height:100, width:dimensions.width-40, marginTop:10}}
            source={require("../assets/map.jpg")}
          />
        </View>
        <Text style={{fontSize:fontSizes.medium}}>Imagen Objeto</Text>
        <View style={{flexDirection:"row",}}>
          <IconButton
            icon="camera"
            color={colors.secondaryColor}
            size={30}
            onPress={()=>{}}
          />     
          <IconButton
            icon="folder"
            color={colors.secondaryColor}
            size={30}
            onPress={()=>{}}
          />
        </View>
        <Text style={{fontSize:fontSizes.medium}}>Audio</Text>
        <IconButton
            icon="microphone"
            color={colors.secondaryColor}
            size={30}
            onPress={()=>{}}
          />     
      </View>
    </View>
  )
}
