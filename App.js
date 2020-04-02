import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AppNavigation from './navigation/AppNavigation';

import {decode, encode} from 'base-64';

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigation/>
      { /*<AuthenticationMenu/>
      <SideMenu /> */}
      {/* <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>New Update</Text>
      </View> */}
    </NavigationContainer>
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
