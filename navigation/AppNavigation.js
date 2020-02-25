import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import AuthenicationMenu from './AuthenticationMenu'
import SideMenu from './SideMenu'

const AppNavigation = createAppContainer(createSwitchNavigator(
    {
        Authentication: {
            screen: AuthenicationMenu
        },
        SideMenu: {
            screen: SideMenu
        }
    }
))

export default AppNavigation;