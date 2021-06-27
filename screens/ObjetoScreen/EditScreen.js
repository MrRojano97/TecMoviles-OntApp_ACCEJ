import React, { useState } from 'react'
import { View } from 'react-native';
import { Modal, Portal, Text, Button, Provider,TextInput , Divider, IconButton } from 'react-native-paper';
import dimensions from '../../styles/dimensions';
import themeTextInput from '../../styles/ThemeTextInput';
import {db} from '../../firebase';

export const EditScreen = ({editVisible, showEdit, hideEdit,objectJSON}) => {

  const [descripcion, setDescripcion] = useState(objectJSON.descripciondeobjeto)
  const [nombre, setNombre] = useState(objectJSON.nombredeobjeto)
  const [direccion, setDireccion] = useState(objectJSON.direccion)
  const containerStyle = {innerHeighth:100,backgroundColor: 'white', padding: 10};
  
  function handleOnSubmit(){
    db.collection('Objetos').doc(objectJSON.id).update({
      nombredeobjeto: nombre,
      descripciondeobjeto: descripcion,
      direccion: direccion
    })
    .then(() => {
      console.log('Objeto actualizado');
    });
    hideEdit();
  }
  
  return (
    
    <Portal>
      <Modal visible={editVisible} onDismiss={hideEdit} contentContainerStyle={{backgroundColor: 'white', padding: 10}}>
        <Text style={{fontSize:20, padding:10}}>Editar Objeto</Text>
        <Divider/>
        <View style={{marginTop:10}}>
          <TextInput 
            style={{marginBottom:10}} 
            TextInput label="Nombre" 
            placeholder={objectJSON.nombredeobjeto}
            onChange={(e) => setNombre(e.nativeEvent.text)}
            theme={themeTextInput}
            ></TextInput>
          <TextInput 
            style={{marginBottom:10}} 
            TextInput label="Descripción"
            placeholder={objectJSON.descripciondeobjeto}
            onChange={(e) => setDescripcion(e.nativeEvent.text)}
            theme={themeTextInput}
          ></TextInput>
          <TextInput 
          TextInput 
          label="Dirección" 
          placeholder={objectJSON.direccion}
          onChange={(e) => setDireccion(e.nativeEvent.text)}
          theme={themeTextInput}
          ></TextInput>
        </View>
        <View style={{
          width:dimensions.width-20, 
          flexDirection:"row",
          justifyContent:"flex-end", 
          alignItems:"center",
          }}>

          <IconButton
            icon="check"
            color="green"
            size={30}
            onPress={ handleOnSubmit }
          />     
          <IconButton
            icon="cancel"
            color="red"
            size={30}
            onPress={hideEdit}
          />
         
        </View>
      </Modal>
    </Portal>
    
  )
}
