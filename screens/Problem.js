import React, { Container } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { 
  View, 
  Text, 
  StyleSheet,
  Button, 
  SafeAreaView 
} from 'react-native';
import CapturePhoto from '../screens/CapturePhoto';
import FinishProblem from '../screens/FinishProblem';
import PreviewPhoto from '../screens/PreviewPhoto';

const Stack = createStackNavigator();

function ProblemScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Button
          title="Take a Photo"
          onPress={() => navigation.navigate('Take Photo')}
        />
      </View>
    </SafeAreaView>
  );
}

function MyNavigator() {
  return (
      <Stack.Navigator initialRouteName="Problem Screen">
        <Stack.Screen name="Start New Problem" component={ProblemScreen} />
        <Stack.Screen name="Finish Problem" component={FinishProblem} />
        <Stack.Screen name="Take Photo" component={CapturePhoto} />
        <Stack.Screen name="Preview Photo" component={PreviewPhoto} />
      </Stack.Navigator>
  );
}

export default function Problem(){
  return (
    <NavigationContainer independent={true}>
      <MyNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
      paddingTop: 24,
      backgroundColor: '#4fb9ff',
      flex: 1
  }
});