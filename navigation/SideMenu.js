import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import Problem from '../screens/Problem';
import Profile from '../screens/Profile';
import SavedProblems from '../screens/SavedProblems';
import SearchGyms from '../screens/SearchGyms';
import SearchProblems from '../screens/SearchProblems';

const Drawer = createDrawerNavigator();

export default function SideMenu() {
  return (
    <Drawer.Navigator initialRouteName="Home" headerMode="screen">
      <Drawer.Screen
        name="Home"
        title='Home'
        component={Home}
        options={{ drawerLabel: 'Home' }}
      />
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