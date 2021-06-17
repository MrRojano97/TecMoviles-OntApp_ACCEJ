import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Menu from '../components/Menu';

export const MapaScreen = () => {
  return (
      <View style={styles.container}>
          <Menu style={{ bottom: 100 }}/>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'flex-end',
  },
});