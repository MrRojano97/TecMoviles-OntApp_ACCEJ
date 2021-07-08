import React, { Text, View, useState, useEffect } from 'react'
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import { Button } from 'react-native-elements';

let a; 

export default class Map extends React.Component {  

    state = {
        userLocation: {},
        errorMessage: ''
    }

    componentDidMount(){
        this._getLocation();
    }

    _getLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status !== 'granted') {
          console.log('El permiso fue negado');
        }

        this.setState({
            errorMessage: 'El permiso fue negado'
        })
        
        const userLocation = await Location.getCurrentPositionAsync({});

        this.setState({
            userLocation
        })

        //Obtengo las coordenadas del usuario
        console.log("\nPosición actual del usuario");
        console.log("Latitud: "+userLocation.coords.latitude);
        console.log("Longitud: "+userLocation.coords.longitude);
    }

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
                <Button>
                    
                </Button>
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


