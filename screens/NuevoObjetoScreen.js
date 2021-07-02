import React, { useState } from 'react';
import {
  Text,
  Button,
  TextInput,
  Divider,
  IconButton,
  Paragraph,
  Dialog
} from 'react-native-paper';
import {View,Image,ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '../styles/colors';
import fontSizes from '../styles/fontSizes';
import dimensions from '../styles/dimensions';
import themeTextInput from '../styles/ThemeTextInput';
import { abrirCamara, abrirGaleria } from '../components/MediaPicker';
import { comenzarGrabacion , pararGrabacion} from '../components/AudioPicker';
import {db} from '../firebase';

/**
 * Vista para crear un nuevo objeto en la aplicacion
 * @returns Vista
 */

export const NuevoObjetoScreen = () => {
  
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState()
  const [grabando, setGrabando] = useState(false)
  const [uriAudio, setUriAudio] = useState()
  const [minutos, setMinutos] = useState(0)
  const [segUnidad, setSegUnidad] = useState(0)
  const [segDecena, setSegDecena] = useState(0)
  const [contador, setContador] = useState()
  const [reproduciendo, setReproduciendo] = useState(false)
  const [nombreObjeto, setnombreObjeto] = useState('');
  const [descripcionObjeto, setdescripcionObjeto] = useState('');
  const [visible, setVisible] = React.useState(false);
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

  const subirImagenFirabase = async() => {
    const response = await fetch(image)
    console.log("Response: ",JSON.stringify(response))
    const blob = await response.blob()
    console.log("Blob: " ,JSON.stringify(blob))
    const ref = firebase.storage().ref().child(`ImagenObjeto/imagen`)
    return ref.put(blob)
  }
  const subirAudioFirebase = async ( )=>{
    const response = await fetch(uriAudio)
    const blob = await response.blob()
    const ref = firebase.storage().ref().child(`AudioObjeto/audio`)
    return ref.put(blob)
  }
  const handleGrabar = async() => {
    const grabacion = await comenzarGrabacion()
    setGrabando(true)
    setAudio(grabacion) 
    cronometrar()
  }
  const handleParaGrabar = async() =>{
    setGrabando(false)
    const uri = await pararGrabacion(audio)
    console.log("URI AUDIO:", uri)
    setUriAudio(uri)
    clearInterval(contador)
    clearContador()
  }
  const clearContador = () => {
    setMinutos(0)
    setSegUnidad(0)
    setSegDecena(0)
  }
  
  const handleGuardar = () => {
    console.log(nombreObjeto)
    console.log(descripcionObjeto)
    db.collection('Objetos').add({
      nombredeobjeto: nombreObjeto,
      descripciondeobjeto: descripcionObjeto
    });
    console.log("GUARDANDO OBJETO")
    subirImagenFirabase().then(()=>{
      console.log("imagen subida")
    })
    .catch((err)=>{
      console.log("ERROR SUBIENDO IMAGEN",err)
    })
    subirAudioFirebase().then(()=>{
      console.log("Audio subido")
    })
    .catch((err)=>{
      console.log("ERROR SUBIENDO AUDIO",err)
    })
    setVisible(true);
  }
  const cronometrar = () => {
    let segU=0
    let segD=0
    let min=0
    let interval = setInterval(() => {
      if(segD===5 && segU===9){
        segD=0
        setSegDecena(segD)
        segU=-1       
        min++
        setMinutos(min)
      }
      else if(segU===9){
        segD++
        segU=-1
        setSegDecena(segD)
      }
      segU++
      setSegUnidad(segU)
    }, 1000)
    setContador(interval)
  }
  const handleReproducirAudio = () => {
    setReproduciendo(true)
    //REPRODUCIR AUDIO
  }
  const handlePararAudio = () => {
    setReproduciendo(false)
    //PARA AUDIO
  }
  
  function hideDialog() {
    props.navigation.navigate('rutas');
    setVisible(false);
  }
  // function agregarObjeto() {
  //   db.collection('Objetos').add({
  //     nombredeobjeto: nombreObjeto,
  //     descripciondeobjeto: descripcionObjeto
  //   });
  //   setVisible(true);
  // }
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
          <TextInput 
            style={{marginBottom:10}} 
            TextInput 
            theme={themeTextInput}
            onChangeText={(e) => setnombreObjeto(e)}/>
          <Text style={{fontSize:fontSizes.medium}}>Descripción</Text>
          <TextInput 
            style={{marginBottom:10}} 
            TextInput 
            theme={themeTextInput}
            onChangeText={(e) => setdescripcionObjeto(e)}  
            />
        </View>
        <View style={{marginBottom:10}}>
          <Text style={{fontSize:fontSizes.medium}}>Ubicación</Text>
          <Image
            style={{ height: 100, width: dimensions.width - 40, marginTop: 10 }}
            source={require('../assets/map.jpg')}
          />
        </View>
        <Text style={{ fontSize: fontSizes.medium }}>Imagen Objeto</Text>
        <View style={{ flexDirection: 'row' }}>
          <IconButton
            icon='camera'
            color={colors.secondaryColor}
            size={30}
            onPress={handleAbrirCamara}
          />     
          <IconButton
            icon='folder'
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
        <View style={{flexDirection:"row",alignItems:"center"}}>
          <IconButton
              icon="microphone"
              color={colors.secondaryColor}
              size={30}
              onPress={handleGrabar}
              disabled={grabando}
          /> 
          {
            grabando && (
              <>
              <Text style={{fontSize:fontSizes.medium}}>{minutos}:{segDecena}{segUnidad}</Text>
              <IconButton
                icon="stop-circle-outline"
                color={"red"}
                size={30}
                onPress={handleParaGrabar}
              /> 
              </>
            )
          }    
        </View>
        {uriAudio&& (
          <View style={{alignItems:"center"}}>
            {reproduciendo 
            ?(
              <IconButton
                icon="pause"
                color={colors.secondaryColor}
                size={30}
                onPress={handlePararAudio}
              />
            ):(
              <IconButton
                icon="play"
                color={colors.secondaryColor}
                size={30}
                onPress={handleReproducirAudio}
              />
            )}
          </View>
        )}
      </View>
      {/* <Button onPress={agregarObjeto}>Agregar objeto</Button> */}
      {visible ? (
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>
            <Paragraph>Objeto Agregado</Paragraph>
          </Dialog.Content>
        </Dialog>
      ) : null}
    </ScrollView>
  );
};
