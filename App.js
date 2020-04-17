import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Permissions from 'expo-permissions'
import Voice from '@react-native-community/voice'
import RNSoundLevel from 'react-native-sound-level'

export default function App() {

  const [showRecordButton,setShowRecordButton]= useState(false)

  async function getPermission(){
    const {status, expires, permissions} = await Permissions.askAsync(Permissions.AUDIO_RECORDING)
    if (status !== 'granted'){
      setShowRecordButton(false)
      startSpeech()
    }else {
      setShowRecordButton(true)
    }
  }

  Voice.onSpeechResults = (e) => {
    console.log(e, 'recsultt')
  }

  Voice.onSpeechRecognized = (e) => {
    console.log(e, 'recognized')
  }

  
  Voice.onSpeechVolumeChanged = (e) =>{
    // console.log('value dibawah')
    console.log(e)
  }


   function startSpeech(){
     Voice.start('en-US')
  }

  function startGame(){
    console.log('masuk sini')
    // startSpeech()
    RNSoundLevel.start()
    RNSoundLevel.onNewFrame = (data) =>{
      console.log('sound level', data)
    }
  }
  useEffect(()=>{
    getPermission()
  })

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      { showRecordButton &&
        <Button onPress={startGame} title="title"></Button>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
