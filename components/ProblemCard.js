import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProblemCardScreen from '../screens/ProblemCardScreen';

const Stack = createStackNavigator();

function ProblemCardNavigator() {
    return (
        <Stack.Navigator initialRouteName = "Problem Card">
            <Stack.Screen name = "Problem Card Screen" component = { ProblemCardScreen }/>
        </Stack.Navigator>
    );
}

// function ProblemCardNavigator() {
//     return (
        
//     )
// }

export default function ProblemCard(props, {navigation}) {
    return (
        <NavigationContainer independent = { true }>
            <ProblemCardNavigator/>
            <TouchableOpacity style={styles.container} onPress = {() => {navigation.navigate('Problem Card Screen')}}>
            <View style={styles.leftInnerContainer}>
                <View style={styles.gymNameContainer}>
                    <Text style={{fontSize: 30, color: 'white'}}>{props.problemName}</Text>
                </View>
                <View style={styles.gymLocationContainer}>
                    <Text style={{fontSize: 15, color: 'white'}}>{props.gymLocation}</Text>
                </View>
            </View>
            <View style={styles.rightInnerContainer}>
                <Text style={{fontSize: 40, color: 'white'}}>V{props.problemLevel}</Text>
            </View>
            <Button
                title = 'Button'
            />
            </TouchableOpacity>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        backgroundColor: '#2576f7', 
        borderWidth: 1, 
        borderColor: 'black', 
        margin: 3, 
        height: 100
    },
    leftInnerContainer: {
        flex: 3
    },
    rightInnerContainer: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center'
    },
    gymNameContainer: {
        flex: 1,
        justifyContent: 'flex-end', 
        paddingLeft: 5
    },
    gymLocationContainer: {
        flex: 1, 
        justifyContent: 'flex-start', 
        paddingLeft: 5
    }
})