import React, { Component } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView 
} from 'react-native';

export default function Problem({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Problem Page</Text>
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