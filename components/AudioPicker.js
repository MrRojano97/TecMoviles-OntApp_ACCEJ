import React, {useEffect } from 'react';
import { Audio } from 'expo-av';

export async function comenzarGrabacion() {
  try {
    console.log('Requesting permissions..');
    await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    }); 
    console.log('Starting recording..');
    const recording = new Audio.Recording();
    await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
    await recording.startAsync();
    console.log('Recording started');
    return(recording) 
    // setRecording(recording);
  } catch (err) {
    console.error('Failed to start recording', err);
  }
}
export async function pararGrabacion(recording) {
  console.log('Stopping recording..');
  // setRecording(undefined);
  await recording.stopAndUnloadAsync();
  const uri = recording.getURI(); 
  console.log('Recording stopped and stored at', uri);
  return uri
}

