//import Expo from 'expo';
import * as ExpoPixi from 'expo-pixi';
import React, { Component, useRef } from 'react';
import { 
  View, 
  Button,
  Text, 
  StyleSheet, 
  SafeAreaView,
  TouchableOpacity,
  Image,
  ImageBackground,
  Camera,
  Dimensions
} from 'react-native';
//import '@expo/browser-polyfill';
import {captureRef as takeSnapshotAsync} from 'react-native-view-shot';


export default class MarkProblem extends Component {
  state = {
    oldImage: this.props.route.params.data.uri,
    image: this.props.route.params.data.uri,
    strokeColor: 0x06D6A0,
    strokeWidth: 10
  };

  

  setHoldType = (type) => {
    if(type == "startHold") this.setState({strokeColor : 0x06D6A0});
    if(type == "normalHold") this.setState({strokeColor : 0xFFD166});
    if(type == "finishHold") this.setState({strokeColor : 0xEF476F});
  };

  onChangeAsync = async ({ width, height }) => {
    const options = {
      format: 'png',
      quality: 0.9,
      height,
      width,
    };
    //const ref = useRef();
    const uri = await takeSnapshotAsync(this.sketch, options);
    this.setState({
      image: uri
    });
    //console.log("Image: ", this.state.image);
  };

  render() {
    const uri = this.state.image;
    const oldUri = this.state.oldImage;
    //console.log("OLD URI:", oldUri);
    return (
      <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
      <ImageBackground 
        style={{
          width: Dimensions.get('window').width,
         height: Dimensions.get('window').width,
         resizeMode: 'contain'
       }} 
        source={{uri: oldUri}} 
        >
        <ExpoPixi.Sketch
          ref={ref => (this.sketch = ref)}
          style={styles.sketch}
          strokeColor={this.state.strokeColor}
          strokeWidth={this.state.strokeWidth}
          strokeAlpha={1}
          onChange={this.onChangeAsync}
          onReady={this.onReady}
        />
      </ImageBackground>
      </View>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          style={styles.button3Style}
          onPress={() => {
            this.sketch.undo();
          }}
        >
        <Text style={styles.buttonTextStyle}>Undo</Text>
        </TouchableOpacity>
        </View>
      <Text></Text>
      <View style={{flexDirection:'row', paddingBottom:20, justifyContent:'center'}}>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => this.setHoldType('startHold')}
            >
            <Text style={styles.buttonTextStyle}>Start Hold</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => this.setHoldType('normalHold')}
            >
            <Text style={styles.buttonTextStyle}>Normal Hold</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => this.setHoldType('finishHold')}
            >
            <Text style={styles.buttonTextStyle}>Finish Hold</Text>
            </TouchableOpacity>
          </View>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
                style={styles.button2Style}
                onPress={() => this.props.navigation.navigate('Finish Problem', {data: {image: this.state.image, oldImage:this.state.oldImage}})}
            >
            <Text style={styles.buttonTextStyle}>Finished Marking</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      paddingTop: 24,
      backgroundColor: '#118AB2',
      flex: 1
  },
  sketch: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
  },
   buttonStyle: {
        backgroundColor: '#06D6A0',
        height: 40,
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        borderWidth: 2,
        borderColor: '#073B4C',
        borderRadius: 5
    },
    button2Style: {
        backgroundColor: '#06D6A0',
        height: 40,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        borderWidth: 2,
        borderColor: '#073B4C',
        borderRadius: 5
    },
    button3Style: {
        backgroundColor: '#EF476F',
        height: 40,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        borderWidth: 2,
        borderColor: '#073B4C',
        borderRadius: 5
    },
    buttonTextStyle: {
        fontSize: 18,
        color: '#073B4C'
    }
});