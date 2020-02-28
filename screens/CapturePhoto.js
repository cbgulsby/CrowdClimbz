import React, { Container, useState, useEffect } from 'react';
import {Camera} from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { 
  View, 
  Button,
  Text, 
  StyleSheet, 
  SafeAreaView,
  TouchableOpacity,
  Alert
} from 'react-native';


export default function CapturePhoto({navigation, route}){
	const [hasPermission, setHasPermission] = useState(null);
  	const [type, setType] = useState(Camera.Constants.Type.back);

  	useEffect(() => {
    	(async () => {
     	 	const { status } = await Camera.requestPermissionsAsync();
      		setHasPermission(status === 'granted');
    	})();
  	}, []);

 //  	snap = async () => {
	// 	if (camera) {
	// 	  let photo = await camera.takePictureAsync();
	// 	}
	// 	Alert.alert("Photo Taken");
	// };
	snap = async () => {
		if (camera) {
			camera.takePictureAsync()
      			.then( (data) => {
        			console.log(data)
        			navigation.navigate("Preview Photo", {data: data})
        	})
		}
	};

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
	return(
		<SafeAreaView style={styles.container}>
      		<View>
       			<Camera style={{ height: 500 }} type={type}
       				ref={ref => {
       					camera = ref;
       				}}
       			>
			        <View
			          style={{
			            flex: 1,
			            backgroundColor: 'transparent',
			            flexDirection: 'row',
			          }}>
			          <TouchableOpacity
			            style={{
			              flex: 0.1,
			              alignSelf: 'flex-end',
			              alignItems: 'center',
			            }}
			            onPress={() => {
			              setType(
			                type === Camera.Constants.Type.back
			                  ? Camera.Constants.Type.front
			                  : Camera.Constants.Type.back
			              );
			            }}>
			            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
			          </TouchableOpacity>
			        </View>
			      </Camera>
			      <Button title="Take Photo" onPress={snap}/>
      		</View>
    	</SafeAreaView>
	);
}

const styles = StyleSheet.create({
  container: {
      paddingTop: 24,
      backgroundColor: '#4fb9ff',
      flex: 1
  }
});