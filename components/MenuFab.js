import React,{useCallback} from 'react'
import { FAB, Portal } from 'react-native-paper';
import { logout } from '../firebase';
import colors from '../styles/colors';

export const MenuFab = ({navigation,route}) => {
  const [state, setState] = React.useState({ open: false });
  const {idValue, userData} = route.params
  console.log("Menu FAB, con ",route.params)
  const onStateChange = ({ open }) => setState({ open });
  const requestLogout = useCallback(() => {
    logout();
  }, []);
  const { open } = state;
  return (
    <Portal>
      <FAB.Group
        open={open}
        icon='menu'
        fabStyle={{backgroundColor:colors.primaryColor}}
        actions={[
          { 
            icon: 'plus',
            label: 'Agregar',
            onPress: () => {navigation.navigate('NuevoObjeto',{
              idValue:idValue,
              userData:userData
            })    }},
          {
            icon: 'map',
            label: 'Mapa',
            onPress: () => {navigation.navigate('mapa', {
              userData: userData,
              idValue: idValue})},
          },
          // {
          //   icon: 'account',
          //   label: 'Cuenta',
          //   onPress: () => {},
          // },       
          // {
          //   icon: 'routes',
          //   label: 'Rutas',
          //   onPress: () => {navigation.navigate('rutas')},
          // },       
          {
            icon: 'login-variant',
            label: 'Cerrar Sesión',
            onPress: () => {requestLogout()},
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
