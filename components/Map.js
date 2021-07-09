import React, { Text, useState, useEffect } from 'react'
import MapView, {Marker} from 'react-native-maps';
import { View,ActivityIndicator,StyleSheet, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import { Button } from 'react-native-elements';
import { LocalConvenienceStoreOutlined } from '@material-ui/icons';
import { db } from '../firebase';

let a; 

export default class Map extends React.Component {  
    
    constructor(props){
      super(props);
      this.state = {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        userData: props.userData
      }
    }
    state = {
        userLocation: {},
        errorMessage: '',
        renderPos: false,
        userData: {},
        data: []
    }

    componentDidMount(){

        this._getLocation().then((userLocation) => {
            this.setState({
                userLocation,
                renderPos:true
            })
            console.log(userLocation);
        });



        console.log(this.state.userData);
       db.collection('Objetos').where('idusuario', '==', this.state.userData.uid).onSnapshot((data) => {
            const list = [];
            data.forEach((doc) => {
                let obj = doc.data();
                obj.id = doc.id;
                console.log(doc.data());
                list.push(obj);
            });
            this.setState({data:list});
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
        console.log("\nPosición actual del usuario");
        console.log("Latitud: "+userLocation.coords.latitude);
        console.log("Longitud: "+userLocation.coords.longitude);
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
                        latitude: this.state.userLocation.coords.latitude,
                        longitude: this.state.userLocation.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >   
                {this.state.data.map((prop, key) => {
                    return (<Marker
                        key={key}
                        coordinate={{ latitude : prop.coordenadas.latitude , longitude : prop.coordenadas.longitude }}
                        title={prop.nombredeobjeto}
                    />)
                })}
                    { this.actualPosition() }
                </MapView>
            );

        }  
    }
}

const styles = StyleSheet.create({
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });