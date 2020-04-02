import React, { Container } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { 
  View, 
  Text, 
  StyleSheet,
  Button, 
  SafeAreaView,
  Image
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import CapturePhoto from '../screens/CapturePhoto';
import FinishProblem from '../screens/FinishProblem';
import PreviewPhoto from '../screens/PreviewPhoto';
import Home from '../screens/Home';
import MarkProblem from '../screens/MarkProblem';

const Stack = createStackNavigator();

class ProblemScreen extends React.Component {
  state = {
      image: null
    };

  
  pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync();
      console.log(result);

      if (!result.cancelled) {
        this.setState({ image: result });
      }
    };

  render(){
    let {image} = this.state;


    return (
      <SafeAreaView style={styles.container}>
        <View style={{paddingBottom:20}}>
          <Button
            title="Take a Photo"
            onPress={() => this.props.navigation.navigate('Take Photo')}
          />
        </View>
        <View>
          <Button
            title="Choose Photo from Phone"
            onPress={this.pickImage}
          />
          {image &&
            <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}
          {image &&
            <Button 
              title="Use this Photo"
              onPress={() => this.props.navigation.navigate('Mark Problem', {data: image})} //FIXME!
          />}
        </View>
      </SafeAreaView>
    );
  }
}

function MyNavigator() {
  return (
      <Stack.Navigator initialRouteName="Problem Screen">
        <Stack.Screen name="Start New Problem" component={ProblemScreen} />
        <Stack.Screen name="Finish Problem" component={FinishProblem} />
        <Stack.Screen name="Take Photo" component={CapturePhoto} />
        <Stack.Screen name="Preview Photo" component={PreviewPhoto} />
        <Stack.Screen name="Mark Problem" component={MarkProblem} />
        <Stack.Screen name="Home" component={Home} />
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