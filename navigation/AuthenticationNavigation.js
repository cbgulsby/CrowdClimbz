import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProblemCardScreen from '../screens/ProblemCardScreen';

import Login from '../screens/Login'
import SignUp from '../screens/SignUp'


const Stack = createStackNavigator();

export default function AuthenticationNavigation() {
    return (
        <Stack.Navigator initialRouteName = "Login" screenOptions = {{headerShown: false}}>
            <Stack.Screen name = "Login" component = {Login}/>
            <Stack.Screen name = "SignUp" component = {SignUp}/>
            <Stack.Screen name = "ProblemCardScreen" component = {ProblemCardScreen}/>
        </Stack.Navigator>
    );
}