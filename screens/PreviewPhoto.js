import React, { Container, useState, useEffect } from 'react';
import {Camera} from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { 
  View, 
  Button,
  Text, 
  StyleSheet, 
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Image
} from 'react-native';

export default function PreviewPhoto({navigation, route}){
	const {data} = route.params;

    console.log(data);

    return (
    	<SafeAreaView style={styles.container}>
        	<View>
         	 <Image 
         	 style={{height: 500}}
         	 source={{ uri: data.uri }} 
           resizeMode='contain'
         	 />
			</View>
      <View style={{alignItems:'center'}}>
			<TouchableOpacity
        style={styles.buttonStyle}
       			title="Use this Photo"
        onPress={() => navigation.navigate('Mark Problem', {data: data})}
      >
      <Text style={styles.buttonTextStyle}>Use this Photo</Text>
      </TouchableOpacity>
          </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
      paddingTop: 24,
      backgroundColor: '#118AB2',
      flex: 1
  },
  buttonStyle: {
      backgroundColor: '#06D6A0',
      height: 40,
      width: '60%',
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