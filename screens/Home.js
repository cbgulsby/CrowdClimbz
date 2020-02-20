import React from 'react';
import { View, Text, Button, SafeAreaView } from 'react-native';

export default function HomeScreen({navigation}) {
  return (
    <SafeAreaView>
      <View style={{paddingTop: 70}}>
        <Button
          title="Go to Post Screen"
          onPress={() => navigation.navigate('Post', {name: 'Home Screen Object'})}
        />
      </View>
    </SafeAreaView>
  );
}