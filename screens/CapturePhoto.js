import React, { Container } from 'react';
import {Camera} from 'expo-camera';
//import * as Permissions from 'expo-permissions';
import { 
  View, 
  Button,
  Text, 
  StyleSheet, 
  SafeAreaView 
} from 'react-native';


export default function CapturePhoto({navigation}){
	return(
		<SafeAreaView style={styles.container}>
      		<View>
       			<Text> Here is the camera screen! </Text>
       			<Button
        			title="Use this Photo"
        			onPress={() => navigation.navigate('Finish Problem')}
        		/>
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