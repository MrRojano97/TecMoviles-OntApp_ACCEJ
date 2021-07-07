import React, { useState, useEffect, useCallback, useContext } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import {
  Card,
  Title,
  Paragraph,
  FAB,
  Portal,
  Provider
} from 'react-native-paper';
import { db } from '../../firebase';

export function DashBoardSceenAlternativo({ navigation, route }) {
  const { user } = route.params;
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    db.collection('Objetos')
      .where('idusuario', '==', user.sesion.uid)
      .onSnapshot((data) => {
        const list = [];

        data.forEach((doc) => {
          let obj = doc.data();

          list.push({
            ...obj
          });
        });
        setDataSource([...list]);
      });
  }, []);
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;
  return (
    <Provider>
      <Portal>
        <ScrollView style={{ backgroundColor: '#65A0FF' }}>
          {dataSource.map((doc) => (
            <Card
              style={{ padding: 8, marginVertical: 5, margin: 10 }}
              elevation={10}
              onPress={() =>
                navigation.navigate('ObjetoAlternativo', {
                  userData: user.userData,
                  item: doc
                })
              }>
              <Card.Cover
                source={{
                  uri: doc.urlObjeto
                }}
              />
              <Card.Content style={{ alignItems: 'center' }}>
                <Title>{doc.nombredeobjeto}</Title>
                <Paragraph>{doc.descripciondeobjeto}</Paragraph>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>
        <FAB.Group
          open={open}
          icon={open ? 'calendar-today' : 'plus'}
          actions={[
            {
              icon: 'plus',
              onPress: () =>
                navigation.navigate('NuevoObjetoAlternativo', {
                  userData: user.userData
                })
            }
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
            }
          }}
          theme={{ colors: { accent: 'blue' } }}
        />
      </Portal>
    </Provider>
  );
}
