import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import Problem from '../screens/Problem';
import Profile from '../screens/Profile';
import SavedProblems from '../screens/SavedProblems';
import SearchGyms from '../screens/SearchGyms';
import SearchProblems from '../screens/SearchProblems';
import ProblemCardScreen from '../screens/ProblemCardScreen';
import CommentScreen from '../screens/CommentScreen';
import VideoScreen from '../screens/VideoScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function SideMenu() {
  return (
    <Drawer.Navigator initialRouteName="Home" headerMode="screen">
      <Drawer.Screen
        name="Home"
        title='Home'
        options={{ drawerLabel: 'Home' }}
      >
      { () => (
        <Stack.Navigator screenOptions = {{headerShown: false}}>
          <Stack.Screen name = "Home" component = {Home}/>
          <Stack.Screen name = "ProblemCardScreen" component = {ProblemCardScreen}/>
          <Stack.Screen name = "CommentScreen" component = {CommentScreen}/>
          <Stack.Screen name = "VideoScreen" component = {VideoScreen}/>
        </Stack.Navigator>
      )}
      </Drawer.Screen>
      <Drawer.Screen
        name="Search Gyms"
        component={SearchGyms}
        options={{ drawerLabel: 'Search Gyms' }}
      />
      <Drawer.Screen
        name="Search Problems"
        component={SearchProblems}
        options={{ drawerLabel: 'Search Problems' }}
      />
      <Drawer.Screen
        name="Problem"
        component={Problem}
        options={{ drawerLabel: 'Make New Problem' }}
      />
      <Drawer.Screen
        name="Saved Problems"
        component={SavedProblems}
        options={{ drawerLabel: 'View Saved Problems' }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{ drawerLabel: 'View Profile' }}
      />
    </Drawer.Navigator>
  );
}