import React, { Component } from 'react';
import { Text, View, TouchableNativeFeedback } from 'react-native';
import { Audio } from 'expo-av';
import { Icon } from 'react-native-elements';

class AudioPlayer extends Component {

    state = {
        isPlaying: false,
    }

  constructor(props) {
    super(props);
    this.state = { isPlaying: false };

    this.loadAudio = this.loadAudio.bind(this);
    this.toggleAudioPlayback = this.toggleAudioPlayback.bind(this);
  }

  componentDidMount() {
    this.loadAudio();
  }

  componentWillUnmount() {
    this.soundObject.stopAsync();
  }

  async loadAudio() {
    this.soundObject = new Audio.Sound();
    this.soundObject.setOnPlaybackStatusUpdate(async (status) => {
      if (status.didJustFinish === true) {
        // audio has finished!
        console.log("audio terminado");
        this.setState({isPlaying:false});
      }
    })
    try {
      await this.soundObject.loadAsync({ uri: this.props.source /* url for your audio file */ });
    } catch (e) {
      console.log('ERROR Loading Audio', e);
    }
  }

  toggleAudioPlayback() {
    this.setState({
      isPlaying: !this.state.isPlaying,
    }, () => (this.state.isPlaying
      ? this.soundObject.playAsync()
      : this.soundObject.stopAsync()));
  }s

  render() {
      if(this.props.source == null){
          return (
            <View style={this.props.style}>
            <Text>Objeto sin audio</Text>
            </View>
          );
      }
    return (
      <TouchableNativeFeedback onPress={this.toggleAudioPlayback}>
        <View style={this.props.style}>
           {(this.state.isPlaying)?<Icon name='stop' type='material-comunity' />:<Icon name='play-circle-outline' type='material-comunity' />}
        </View>
      </TouchableNativeFeedback>
    );
  }
}

export default AudioPlayer;