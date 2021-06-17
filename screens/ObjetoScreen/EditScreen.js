import React, { useState } from 'react'
import { View } from 'react-native';
import { Modal, Portal, Text, Button, Provider,TextInput , Divider, IconButton } from 'react-native-paper';
import dimensions from '../../styles/dimensions';

export const EditScreen = ({editVisible, showEdit, hideEdit,objectJSON}) => {

  const [descripcion, setDescripcion] = useState(objectJSON.descripcion)
  const [nombre, setNombre] = useState(objectJSON.nombre)
  const [direccion, setDireccion] = useState(objectJSON.direccion)
  const containerStyle = {innerHeighth:100,backgroundColor: 'white', padding: 10};
  return (
    
    <Portal>
      <Modal visible={editVisible} onDismiss={hideEdit} contentContainerStyle={{backgroundColor: 'white', padding: 10}}>
        <Text style={{fontSize:20, padding:10}}>Editar Objeto</Text>
        <Divider/>
        <View style={{marginTop:10}}>
          <TextInput style={{marginBottom:10}} TextInput label="Nombre" placeholder={objectJSON.nombre}></TextInput>
          <TextInput style={{marginBottom:10}} TextInput label="Descripción" placeholder={objectJSON.descripcion}></TextInput>
          <TextInput TextInput label="Dirección" placeholder={objectJSON.direccion}></TextInput>
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
            onPress={()=>{}}
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
