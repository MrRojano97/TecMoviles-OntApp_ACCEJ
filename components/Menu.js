import React from 'react'
import { View, Text, StyleSheet, Image, Animated, TouchableWithoutFeedback } from 'react-native'
import { AntDesign, Entypo, MaterialIcons } from '@expo/vector-icons';
import styles from '../styles/styles';


class Menu extends React.Component {

  constructor(props) {
    super(props);
  }

    animation = new Animated.Value(0)

    ToggleMenu = () => {
      const toValue = this.open ? 1 : 0;

      Animated.spring(this.animation, {
        toValue,
        friction: 5
      }).start();

      this.open = !this.open;
    }

    render() {

      const createStyle = {
        transform: [
          { scale: this.animation },
          {
            translateY: this.animation.interpolate({
              inputRange: [0,1],
              outputRange: [0, -80]
            })

          }
        ]
      }

      const imageStyle = {
        transform: [
          { scale: this.animation },
          {
            translateY: this.animation.interpolate({
              inputRange: [0,1],
              outputRange: [0, -140]
            })

          }
        ]
      }

      const mapStyle = {
        transform: [
          { scale: this.animation },
          {
            translateY: this.animation.interpolate({
              inputRange: [0,1],
              outputRange: [0, -200]
            })

          }
        ]
      }

      const logStyle = {
        transform: [
          { scale: this.animation },
          {
            translateY: this.animation.interpolate({
              inputRange: [0,1],
              outputRange: [0, -260]
            })

          }
        ]
      }
      
      const rotation = {
        transform: [
          {
            rotate: this.animation.interpolate({
              inputRange: [0,1],
              outputRange: ["0deg", "45deg"]
            })
          } 
        ]
      }

      const opacity = this.animation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 0, 1]
      })

        return (
          <View style={[styles.container, this.props.style]}>

            <TouchableWithoutFeedback >
              <Animated.View style={[styles.button, styles.second, logStyle, opacity]}>
              <MaterialIcons name="logout" size={20} color="black" />
              </Animated.View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback> 
              <Animated.View style={[styles.button, styles.second, mapStyle, opacity]}>
              <Entypo name="map" size={20} color="black" />
              </Animated.View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback>
              <Animated.View style={[styles.button, styles.second, imageStyle, opacity]}> 
                <Entypo name="images" size={20} color="black" />
              </Animated.View>
            </TouchableWithoutFeedback>
            
            <TouchableWithoutFeedback>
              <Animated.View style={[styles.button, styles.second, createStyle, opacity]}>
                <Entypo name="box" size={20} color="black" />
              </Animated.View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={this.ToggleMenu}>
              <Animated.View style={[styles.button, styles.menu, rotation]}>
                <AntDesign name="plus" size={24} color="black" />
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        );
    }  
};

export default Menu;
