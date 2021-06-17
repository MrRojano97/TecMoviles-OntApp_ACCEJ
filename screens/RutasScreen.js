import React from 'react'
import { Button, Text, View } from 'react-native'
import styles from '../styles/styles'

/**
 * Este es un componente funcional de ejemplo de como direccionar a una vista. 
 * Los botones contienen una accion onPress que dirige la navegacion hacia una vista.
 * @param {*} param0 props de navegacion proveido por react navigation. Esta prop se 
 * envia automaticamente desde el componente de NavigatorStack.js
 * @returns Vista con botones para dirigir la navegacion hacia las vistas
 */
export const RutasScreen = ({navigation}) => {
    const handlePressLogin = (vista) =>{
      // nevegar hacia la vista recibida
      navigation.navigate(vista)
    }
    return (
        <View style={styles.container}>
          <Text style={styles.textcenter}>
            Momentaneamente, la navegación entre las vistas de la aplicación se hara 
            mediante botones. Pulsar el boton de una vista para dirigirse a ella.
          </Text>
          <View style={styles.separator}/>
          <View style={styles.singlebutton}>
            <Button title="Mapa" onPress={()=> handlePressLogin('mapa')}/>
          </View>
          <View style={styles.singlebutton}>
            <Button title="Galeria" onPress={()=> handlePressLogin('galeria')}/>
          </View>
          <View style={styles.singlebutton}>
            <Button title="Nuevo Objeto" onPress={()=> handlePressLogin('nuevo')}/>
          </View>
          <View style={styles.singlebutton}>
            <Button title="Login" onPress={()=> handlePressLogin('login')}/>
          </View>
          <View style={styles.singlebutton}>
            <Button title="Objeto" onPress={()=> handlePressLogin('objeto')}/>
          </View>
          <View style={styles.singlebutton}>
            <Button title="Cargando..." onPress={()=> handlePressLogin('cargando')}/>
          </View>
        </View>
    )
}
