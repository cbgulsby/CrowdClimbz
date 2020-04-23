import React, { Container } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { 
  View, 
  Text, 
  StyleSheet,
  Button, 
  SafeAreaView,
  Image,
  TouchableOpacity
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import CapturePhoto from '../screens/CapturePhoto';
import FinishProblem from '../screens/FinishProblem';
import PreviewPhoto from '../screens/PreviewPhoto';
import MarkProblem from '../screens/MarkProblem';
import AddGym from '../screens/AddGym';

const Stack = createStackNavigator();

class ProblemScreen extends React.Component {
  state = {
      image: null
    };

  
  pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true
      });
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
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => this.props.navigation.navigate('Take Photo')}
          >
          <Text style={styles.buttonTextStyle}>Take a Photo</Text>
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={this.pickImage}
          >
          <Text style={styles.buttonTextStyle}>Choose Photo from Phone</Text>
          </TouchableOpacity>
          {image &&
            <Image source={{ uri: image.uri }} style={{ width: 300, height: 300 }} />}
          {image &&
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => this.props.navigation.navigate('Mark Problem', {data: image})}
          >
          <Text style={styles.buttonTextStyle}>Use this Photo</Text>
          </TouchableOpacity>}
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
        <Stack.Screen name="Add Gym" component={AddGym} />
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
      backgroundColor: '#118AB2',
      alignItems: 'center',
      flex: 1
  },
  buttonStyle: {
        backgroundColor: '#06D6A0',
        height: 80,
        width: 250,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        borderWidth: 2,
        borderColor: '#073B4C',
        borderRadius: 5
    },
    buttonTextStyle: {
        fontSize: 20,
        color: '#073B4C'
    }
});