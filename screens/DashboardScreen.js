import React, { useEffect, useState } from 'react';
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
import {Provider as PaperProvider } from 'react-native-paper';
import { render } from 'react-dom';

export const DashboardScreen = ({ navigation, route }) => {
  const [dataSource, setDataSource] = useState([]);
  console.log("Dash con ",route.params)
  const {userData,idValue} = route.params
  //obtener el margen superior de cada celular
  const {top} = useSafeAreaInsets()
  useEffect(() => {
        
        db.collection('Objetos').where('idusuario','==',idValue)
        .onSnapshot((data) => {
          const list = [];
            data.forEach((doc) => {
                let obj = doc.data();
                obj.id = doc.id;
                console.log(doc.data())
                list.push(obj);
            });
            setDataSource([...list]);
        });
    }, []);
    

    return (
      <PaperProvider>
          <SafeAreaView style={styles.container2,{marginTop:top}}>
          <MenuFab navigation={navigation} route={route}/>
          <FlatList
            data={dataSource}
            renderItem={({ item }) => (
              <View style={{ flex: 1, 
                    flexDirection: 'column', 
                    margin: 5, 
                    borderColor: 'gainsboro', 
                    borderWidth: 1 }}>
                  <TouchableOpacity onPress={() => { navigation.navigate('Objeto', { item: item })} }>
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
      </PaperProvider>
    );
    
}