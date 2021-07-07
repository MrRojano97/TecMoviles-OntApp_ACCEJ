import React, { useState } from 'react';
import {
  Menu,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  Image,
  Text
} from 'react-native';
import styles from '../styles/styles';
import BarOptions from './ObjetoScreen/BarOptions';
import {db} from '../firebase';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MenuFab } from '../components/MenuFab'
import { Loading } from '../components/Loading';
export const DashboardScreen = ({ navigation }) => {
  const [dataSource, setDataSource] = useState([]);

  //obtener el margen superior de cada celular
  const {top} = useSafeAreaInsets()
  
  useState(() => {
        var list = [];
        const usersCollection = db.collection('Objetos').get().then((data) => {
            data.forEach((doc) => {
                let obj = doc.data();
                obj.id = doc.id;
                list.push(obj);
            });
            setDataSource(list);
        });
    }, []);
    return (
        <SafeAreaView style={styles.container2,{marginTop:top}}>
        <MenuFab navigation={navigation}/>
        <FlatList
          data={dataSource}
          renderItem={({ item }) => (
            <View style={{ flex: 1, 
                            flexDirection: 'column', 
                            margin: 5, 
                            borderColor: 'gainsboro', 
                            borderWidth: 1 }}>
                <TouchableOpacity onPress={() => { navigation.navigate('objeto', { item: item })} }>
                    <Image style={styles.imageThumbnail} source={{ uri:item.urlObjeto }} />
                </TouchableOpacity>
                <Text style={{ flexDirection: 'column',
                                justifyContent: 'space-between', 
                                flex: 1, 
                                paddingTop:16, 
                                marginLeft: 8, 
                                textAlign: 'left'}}>{ item.nombredeobjeto }</Text>
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
        {/* <Loading/> */}
      </SafeAreaView>
    )
}