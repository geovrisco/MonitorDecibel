import React,{useEffect,useState,Component} from 'react';
import { StyleSheet, Text, View, StatusBar,TouchableOpacity ,Button} from 'react-native';
import RNSoundLevel from 'react-native-sound-level'
import Constants from './assets/dimensions'
import {GameEngine} from 'react-native-game-engine'
import Matter from 'matter-js'
import * as Permissions from 'expo-permissions'
import Character from './assets/character'
import Physics from './assets/physics'
import Floor from './assets/floor'

// export default function App() {

//   const [showRecordButton,setShowRecordButton]= useState(false)

//   async function getPermission(){
//     const {status, expires, permissions} = await Permissions.askAsync(Permissions.AUDIO_RECORDING)
//     if (status !== 'granted'){
//       setShowRecordButton(false)
//       startSpeech()
//     }else {
//       setShowRecordButton(true)
//     }
//   }





//   function startGame(){
//     console.log('masuk sini')
//     // startSpeech()
//     RNSoundLevel.start()
//     RNSoundLevel.onNewFrame = (data) =>{
//       console.log('sound level', data)
//     }
//   }
//   useEffect(()=>{
//     getPermission()
//   })

//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       { showRecordButton &&
//         <Button onPress={startGame} title="title"></Button>
//       }
//     </View>
//   );
// }

export default class App extends Component {
  constructor(props){
    super(props)
    this.gameEngine = null;
    this.entities = this.setupWorld()
    this.state = {
      rawValue:0,
      valueInDb:0
    }
  }

  
  setupWorld = () =>{
    // console.log(Matter)

    let engine = Matter.Engine.create({ enableSleeping:false})
    let world = engine.world;
    // console.log(world)
    let character = Matter.Bodies.rectangle(Constants.MAX_WIDTH / 4, Constants.MAX_HEIGHT-100, 50,50)
    let floor  = Matter.Bodies.rectangle(Constants.MAX_WIDTH/2, Constants.MAX_HEIGHT - 50, Constants.MAX_WIDTH,50, {isStatic:true})
    Matter.World.add(world, [character,floor]) 

    return{
      physics: {engine, world, RNSoundLevel},
      character: {body:character, size:[50,50], color:"blue", renderer: Character},
      floor: {body:floor, size:[Constants.MAX_WIDTH,50], color:"red", renderer: Floor}
    }
  }



  componentDidMount(){
    // RNSoundLevel.stop()
    RNSoundLevel.start()
    RNSoundLevel.onNewFrame = (data) =>{
            this.setState({
              rawValue:data.rawValue,
        valueInDb:data.value
      })
      // console.log(this.state.rawValue)
    }
    // console.log(this.state)
  }

  render(){
    return(
      <View style={styles.container}>
        <GameEngine
          ref={(ref) => { this.gameEngine = ref}}
          style={styles.gameContainer}
          systems = {[Physics]}
          entities= {this.entities}
          running={true}
        />
        <View style={{position:"absolute", top:30,left:0,bottom:0,right:0,flex:1}}>
          <Button title="stop"
            onPress={RNSoundLevel.stop}
          >
          </Button>
        <Button title="start" onPress={RNSoundLevel.start}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
