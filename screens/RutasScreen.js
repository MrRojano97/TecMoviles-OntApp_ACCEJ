import React from 'react'
import { Button, Text, View } from 'react-native'
import styles from '../styles/styles'

export const RutasScreen = (props) => {

    const handlePressLogin = (vista) =>{
        props.navigation.navigate(vista)
    }
    return (
        <div>
            <View style={styles.container}>
                <Text style={styles.textcenter}>
                    Momentaneamente, la navegación entre las vistas de la aplicación se hara mediante botones. Pulsar el boton de una vista para dirigirse a ella.
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
                
                
            </View>
        </div>
    )
}
