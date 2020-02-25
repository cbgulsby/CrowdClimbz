import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import Login from '../screens/Login'
import SignUp from '../screens/SignUp'
import Home from '../screens/Home'

//const AuthenticationMenu = createAppContainer(createSwitchNavigator(
const AuthenticationMenu = createSwitchNavigator(
    {
        Login: Login,
        SignUp: SignUp,
        Home: Home
    },
    {
        initialRouteName: 'Login'
    }
)
 //   ))

export default AuthenticationMenu;