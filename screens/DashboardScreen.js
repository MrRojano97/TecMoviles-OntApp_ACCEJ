import React, { useState } from 'react';
import { Menu, Alert, TouchableOpacity, SafeAreaView, StyleSheet, View, FlatList, Image, Text } from 'react-native';
import styles from '../styles/styles';
import BarOptions from './ObjetoScreen/BarOptions';
import {db} from '../database/firebase'

export const DashboardScreen = ({navigation}) => {
    const [dataSource, setDataSource] = useState([]);

    useState(() => {
        /*let items = Array.apply(null, Array(60)).map((v, i) => {
            return { id: i, name: 'Item ' + (i+1) , src: 'http://placehold.it/200x200?text=' + (i + 1) };
        });
        items = [
            {
                id: 1,
                name: "Objeto de prueba",
                src: "http://placehold.it/200x200?text=Item1"
            },
            {
                id: 2,
                name: "Objeto de prueba 2",
                src: "http://placehold.it/200x200?text=Item2"
            },
            {
                id: 3,
                name: "Objeto de prueba 3",
                src: "http://placehold.it/200x200?text=Item3"
            },
            {
                id: 4,
                name: "Objeto de prueba 4",
                src: "http://placehold.it/200x200?text=Item4"
            }
        ];*/
        var list = [];
        const usersCollection = db.collection('Objetos').get().then((data) => {
            data.forEach((doc) => {
                list.push(doc.data());
                console.log(doc.data());
            });
            setDataSource(list);
        });
    }, []);
    return (
        <SafeAreaView style={styles.container2}>
        <FlatList
          data={dataSource}
          renderItem={({ item }) => (
            <View style={{ flex: 1, 
                            flexDirection: 'column', 
                            margin: 5, 
                            borderColor: 'gainsboro', 
                            borderWidth: 1 }}>
                <TouchableOpacity onPress={() => { navigation.navigate('objeto')} }>
                    <Image style={styles.imageThumbnail} source={{ uri: 'http://placehold.it/200x200?text=Item' }} />
                </TouchableOpacity>
                <Text style={{ flexDirection: 'column',
                                justifyContent: 'space-between', 
                                flex: 1, 
                                paddingTop:16, 
                                marginLeft: 8, 
                                textAlign: 'left'}}>{ item.name }</Text>
                <Image style={{ height: 32, 
                                width: 32, 
                                position: 'absolute', 
                                left:8, 
                                bottom:16, 
                                justifyContent: 'center', 
                                alignItems: 'center'}} source={{ uri: 'https://hook.finance/sites/default/files/user.png'}} />
            </View>
                          
          )}
          //Setting the number of column
          numColumns={2}
          keyExtractor={(item, index) => index}
        />
        
      </SafeAreaView>
    )
}