import React, { Text, useState, useEffect } from 'react'
import MapView, {Marker} from 'react-native-maps';
import { View,ActivityIndicator,StyleSheet, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import { Button } from 'react-native-elements';

let a; 

export default class Map extends React.Component {  

    constructor(props){
      super(props);
      // this.state = {
      //   width: Dimensions.get('window').width,
      //   height: Dimensions.get('window').height
      // }
    }
    state = {
        userLocation: {},
        errorMessage: '',
        renderPos: false
    }

    componentDidMount(){
        this._getLocation().then((userLocation) => {
            this.setState({
                userLocation,
                renderPos:true
            })
            // console.log(userLocation);
        });
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

        //Obtengo las coordenadas del usuario
        // console.log("\nPosición actual del usuario");
        // console.log("Latitud: "+userLocation.coords.latitude);
        // console.log("Longitud: "+userLocation.coords.longitude);
        return userLocation;

    }

    actualPosition(){
        if(this.state.renderPos){
            return (<Marker
                coordinate={{ latitude : this.state.userLocation.coords.latitude , longitude : this.state.userLocation.coords.longitude }}
                title={"Posición actual"}
                description={"Está es la posición actual del usuario"}
            />);
        }
    }

    render(){
        if(!this.state.renderPos){
            return (
                <View style={{flex:1}}>
                    <ActivityIndicator style={{ position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        alignItems: 'center',
                        justifyContent: 'center' }} size="large" color="#0000ff"/>
                </View>
            );
        }else{
            return (
                <MapView style={styles.map} 
                    initialRegion={{
                        latitude: this.props.item.coordenadas.latitude,
                        longitude: this.props.item.coordenadas.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Marker
                        coordinate={{ latitude : this.props.item.coordenadas.latitude , 
                        longitude : this.props.item.coordenadas.longitude }}
                        title={"Aqui esta tu objeto"}
                        
                        // description={"Este es un segundo marcador de prueba"}
                    />
                    { this.actualPosition() }
                    <Button>
                        
                    </Button>
                </MapView>
            );

        }  
    }
}

const styles = StyleSheet.create({
    map: {
      width: Dimensions.get('window').width-40,
      height: 150,
    },
  });