import Expo from 'expo';
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
} from 'react-native';
import '@expo/browser-polyfill';
import {captureRef as takeSnapshotAsync} from 'react-native-view-shot';


export default class MarkProblem extends Component {
  state = {
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
      format: 'jpg',
      quality: 0.9,
      height,
      width,
    };
    const ref = useRef();
    const uri = await takeSnapshotAsync(this.sketch, options);
    this.setState({
      image: uri
    });
    console.log("Image: ", this.state.image);
  };

  onReady = () => {
    console.log('ready!');
    console.log("STATE: ", this.state.image);
    var myUri = this.state.image;
    //var img = new HTMLImageElement(myUri);
    //we create a PIXI.Texture using the img
    var tex = PIXI.Texture.from(myUri);
    //And the sprite using the texture
    const sprite = PIXI.Sprite.from(tex);
    this.sketch.stage.addChild(sprite); // this is the sketch.stage instance
    this.sketch.renderer._update();  // this is the sketch.renderer instance
    console.log("made it");
  };

  async add(uri) {
    console.log("STATE: ", this.state.image);
    var myUri = this.props.route.params.data.uri;
    var img = new HTMLImageElement(myUri);
    //we create a PIXI.Texture using the img
    var tex = PIXI.Texture.from(img);
    //And the sprite using the texture
    const sprite = PIXI.Sprite.from(tex);
    sprite.width = 500;
    sprite.height = 500;
    this.sketch.stage.addChild(sprite); // this is the sketch.stage instance
    this.sketch.renderer._update();  // this is the sketch.renderer instance
    console.log("made it");
  }

  render() {
    var uri = this.state.image;
    return (
      <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
      <ImageBackground 
        style={{height: 500}} 
        source={{uri}} 
        resizeMode='contain'
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
        <Button
          color={'blue'}
          title="undo"
          style={styles.button}
          onPress={() => {
            this.sketch.undo();
          }}
        />
        <Button
          color={'blue'}
          title="add"
          style={styles.button}
          onPress={() => this.add(uri)}
        />
      </View>
      <Text></Text>
      <View style={{flexDirection:'row', paddingBottom:20, justifyContent:'center'}}>
            <Button
              title="Start Hold"
              onPress={() => this.setHoldType('startHold')}
            />
            <Button
              title="Normal Hold"
              onPress={() => this.setHoldType('normalHold')}
            />
            <Button
              title="Finish Hold"
              onPress={() => this.setHoldType('finishHold')}
            />
          </View>
          <View>
            <Button
                title="Finished Marking"
                onPress={() => this.props.navigation.navigate('Finish Problem', {data: this.state.image})}
              />
          </View>
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      paddingTop: 24,
      backgroundColor: '#4fb9ff',
      flex: 1
  },
  sketch: {
    height: 500
  }
});