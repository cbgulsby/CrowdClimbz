import React from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  StyleSheet 
} from 'react-native';

export default function Home({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={{fontSize: 20}}>Welcome to CrowdClimbz!</Text>
      </View>
      <View>
        <Text style={{fontSize: 20}}>Pull the drawer from the left to use the app!</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
      paddingTop: 24,
      backgroundColor: '#4fb9ff',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  }
});