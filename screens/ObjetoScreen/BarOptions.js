import React from 'react'
import { useState } from 'react'
import { Text, View } from 'react-native'
import { Divider, Menu, IconButton, Colors } from 'react-native-paper'
import colors from '../../styles/colors'
import dimensions from '../../styles/dimensions'
import PropTypes from 'prop-types';


export const BarOptions = ({nombreoObjeto="Sin nombre", showEdit, optionVisible,setOptionVisible}) => {
  
  const handleOpen = () => {
    setOptionVisible(!optionVisible)
  }
  const closeMenu = () => {
    setOptionVisible(false)
  }
  
  return (
    
      <View style={{
        height:50,
        flex:1,
        flexDirection:"row",
        backgroundColor:colors.secondaryColor
        }}>
        <View style={{width:dimensions.width-50, flexDirection:"row", alignSelf:"center"}}>
          <Text style={{marginLeft:20, color:colors.white, fontWeight:"bold", fontSize:20}}>{nombreoObjeto}</Text>
        </View>
        <View style={{flex:1, justifyContent:'flex-end'}}>
          <Menu
            visible={optionVisible}
            onDismiss={closeMenu}
            anchor={
              <IconButton
              icon="dots-vertical"
              // color={Colors.red500}
              color={colors.white}
              size={20}
              onPress={handleOpen}
            />
            }>
            <Menu.Item icon="pencil" onPress={showEdit} title="Editar" />
            <Menu.Item icon="delete" onPress={() => {}} title="Eliminar" />
          </Menu>
        </View>       
      </View>
    
  )
}
BarOptions.propTypes = {
  setOptionVisible: PropTypes.func
}