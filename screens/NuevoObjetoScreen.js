import React, {useState, useStyles} from 'react'
import { Modal, Portal, Text, Button, Provider,TextInput , Divider, IconButton, Avatar } from 'react-native-paper';
import {StyleSheet, View,Image,ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import colors from '../styles/colors'
import { makeStyles } from 'react-native-elements';
import fontSizes from '../styles/fontSizes';
import dimensions from '../styles/dimensions';
import themeTextInput from '../styles/ThemeTextInput';
import { abrirCamara, abrirGaleria } from '../components/MediaPicker';
import { comenzarGrabacion , pararGrabacion} from '../components/AudioPicker';
import { BarOptions } from './ObjetoScreen/BarOptions';

/**
 * Vista para crear un nuevo objeto en la aplicacion
 * @returns Vista 
 */

export const NuevoObjetoScreen = ({}) => {
  
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState()
  const [grabando, setGrabando] = useState(false)
  const [uriAudio, setUriAudio] = useState()
  const {top} = useSafeAreaInsets()
  const handleAbrirCamara = async() => {
    const resultado = await abrirCamara()
    console.log("Resultado:",resultado)
    if(!resultado.cancelled){
      setImage(resultado.uri)
    }
  }
  const handleAbrirGaleria = async() => {
    const resultado = await abrirGaleria()
    console.log("Resultado:",resultado)
    if(!resultado.cancelled){
      setImage(resultado.uri)
    }
  }
  const handleGrabar = async() => {
    const grabacion = await comenzarGrabacion()
    setGrabando(true)
    setAudio(grabacion)
  }
  const handleParaGrabar = async() =>{
    setGrabando(false)
    const uri = await pararGrabacion(audio)
    console.log("URI AUDIO:", uri)
    setUriAudio(uri)
  }
  const handleGuardar = () => {
    console.log("GUARDANDO OBJETO")
  }
  
  return (
    <ScrollView style={{top:top}}>
      <View style={{
        height:60,
        flex:1,
        flexDirection:"row",
        backgroundColor:colors.primaryColor
        }}>
        <View style={{width:dimensions.width-120, alignSelf:"center"}}>
          <Text style={{marginLeft:20, color:colors.white, fontWeight:"bold", fontSize:20}}>Nuevo Objeto</Text>
        </View>
        <View style={{flexDirection:"row",justifyContent:'flex-start', alignSelf:"center",}}>
        <Button
            icon="content-save"
            // icon={<Avatar.icon size={35}/>}
            color={colors.blue_dark}
            onPress={handleGuardar}
            mode="contained"
            compact={true}
          >Guardar</Button>     
        </View>       
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
            onPress={handleAbrirCamara}
          />     
          <IconButton
            icon="folder"
            color={colors.secondaryColor}
            size={30}
            onPress={handleAbrirGaleria}
          />
        </View>
        {image && (
          <View style={{alignItems:"center"}}>
            <Image source={{ uri: image }} style={{ width: 270, height: 360 }} />
          </View>
        )}
        <Text style={{fontSize:fontSizes.medium}}>Audio</Text>
        <View style={{flexDirection:"row",}}>
          <IconButton
              icon="microphone"
              color={colors.secondaryColor}
              size={30}
              onPress={handleGrabar}
              disabled={grabando}
          /> 
          {
            grabando && (
              <IconButton
              icon="stop-circle-outline"
              color={"red"}
              size={30}
              onPress={handleParaGrabar}
          /> 
            )
          }    
        </View>
      </View>
    </ScrollView>
  )
}
