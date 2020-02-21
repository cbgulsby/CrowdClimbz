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
        <Text>Home Page</Text>
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