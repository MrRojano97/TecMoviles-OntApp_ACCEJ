import React from 'react'
import { FAB, Portal } from 'react-native-paper';

export const MenuFab = ({navigation}) => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;
  return (
    <Portal>
      <FAB.Group
        open={open}
        icon='menu'
        actions={[
          { 
            icon: 'plus',
            label: 'Agregar',
            onPress: () => {navigation.navigate('nuevo')} },
          {
            icon: 'map',
            label: 'Mapa',
            onPress: () => {navigation.navigate('mapa')},
          },
          {
            icon: 'account',
            label: 'Cuenta',
            onPress: () => {},
          },       
          {
            icon: 'routes',
            label: 'Rutas',
            onPress: () => {navigation.navigate('rutas')},
          },       
        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
      />
    </Portal>
  )
}
