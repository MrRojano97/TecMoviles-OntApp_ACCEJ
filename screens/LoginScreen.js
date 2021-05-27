import React from 'react'
import { Button, Text, View, StyleSheet } from 'react-native'
import styles from '../styles/styles'

export const LoginScreen = (props) => {
    const handlePressLogin = () =>{
        props.navigation.navigate("rutas")
    }
    return (
        <div>
            <View style={styles.container}>
                <Button title="Entrar" onPress={handlePressLogin}/>
            </View>
        </div>
    )
}
