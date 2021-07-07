import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { Modal, Portal } from 'react-native-paper'
import styles from '../styles/styles'
export const Loading = ({isVisible=true, text="cargando"}) => {
  return (
      <Portal>
        <Modal
          visible={isVisible}
          theme={{
            colors:{
              backdrop:"transparent",
            }
          }}
          contentContainerStyle={styles.loadingModal}
          >
          <View style={styles.loadingView}>
            <ActivityIndicator size="large" color="#00a680"/>               
            {text.length>0 && <Text style={styles.loadingText}> {text} </Text> }
          </View>
        </Modal>
      </Portal>
      
      
  )
}
