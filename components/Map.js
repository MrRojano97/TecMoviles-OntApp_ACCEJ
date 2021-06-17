import React, { useState, useEffect } from 'react'
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, Dimensions } from 'react-native';
import * as Location from 'expo-location';

      
export default class Map extends React.Component {  

    
    render(){
        return (
            <MapView style={styles.map} 
                initialRegion={{
                    latitude: -34.9779853,
                    longitude: -71.2528803,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker
                    coordinate={{ latitude : -34.9779853 , longitude : -71.2528803 }}
                    title={"Curicó"}
                    description={"Este es un marcador de prueba"}
                />

                <Marker
                    coordinate={{ latitude : -34.9897286 , longitude : -71.2432817 }}
                    title={"Otro marcador de prueba"}
                    description={"Este es un segundo marcador de prueba"}
                />
            </MapView>
        );
    }
}

const styles = StyleSheet.create({
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });


