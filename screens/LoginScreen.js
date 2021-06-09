import React from 'react'
import { Button, Text, View, StyleSheet } from 'react-native'
import styles from '../styles/styles'
/**
 * Vista del Login
 * @param {*} param0 props proveido por NavigatorStack.js, permite dirigir la navegacion hacia las vistas.
 * @returns Vista de login
 */
export const LoginScreen = ({navigation}) => {
    const handlePressLogin = () =>{
        navigation.navigate("rutas")
    }
    return (
        <div>
            <View style={styles.container}>
                <Button title="Entrar" onPress={handlePressLogin}/>
            </View>
        </div>
    )
}
