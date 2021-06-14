import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, FlatList, Image, Text } from 'react-native';
import styles from '../styles/styles';

export const DashboardScreen = () => {
    const [dataSource, setDataSource] = useState([]);

    useState(() => {
        let items = Array.apply(null, Array(60)).map((v, i) => {
            return { id: i, src: 'http://placehold.it/200x200?text=' + (i + 1) };
        });
        setDataSource(items);
    }, []);

    return (
        <SafeAreaView style={styles.container2}>
        <FlatList
          data={dataSource}
          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
                <Image style={styles.imageThumbnail} source={{ uri: item.src }} />
                <Text style={{flex:1}}>Centered text</Text>
            </View>
                          
          )}
          //Setting the number of column
          numColumns={3}
          keyExtractor={(item, index) => index}
        />
      </SafeAreaView>
    )
}