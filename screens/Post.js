import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

export default function PostScreen({navigation}) {
  return (
    <View style={{paddingTop: 24}}>
      <Button
        title="Go to Home Screen"
        onPress={() => navigation.navigate('Home', {name: 'Post Screen Object'})}
      />
    </View>
  );
}