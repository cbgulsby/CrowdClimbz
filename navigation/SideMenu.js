import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import Post from '../screens/Post';

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
        name="Post"
        component={Post}
        options={{ drawerLabel: 'Post' }}
      />
    </Drawer.Navigator>
  );
}