import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AuthenticationNavigation from './AuthenticationNavigation';
import SideMenu from './SideMenu';

const Stack = createStackNavigator();

export default function AppNavigation() {
    return (
        <Stack.Navigator screenOptions = {{headerShown: false}}>
            <Stack.Screen name = "Authentication" component = {AuthenticationNavigation}/>
            <Stack.Screen name = "SideMenu" component = {SideMenu}/>
        </Stack.Navigator>
    )
}

