import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Map from '../components/Map'

export const MapaScreen = () => {
  return (
      <View style={styles.container}>
          <Map/>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
  },
});