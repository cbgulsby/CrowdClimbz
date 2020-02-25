import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import Login from '../screens/Login'
import SignUp from '../screens/SignUp'

const AuthenticationNavigation = createSwitchNavigator(
    {
        Login: Login,
        SignUp: SignUp,
    },
    {
        initialRouteName: 'Login'
    }
);

export default AuthenticationNavigation;