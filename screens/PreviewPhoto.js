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
         	 style={{height:500}}
         	 source={{ uri: data.uri }} 
         	 />
			</View>
			<Button
       			title="Use this Photo"
        		onPress={() => navigation.navigate('Finish Problem', {data: data})}
        	/>
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