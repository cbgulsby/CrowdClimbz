import React from 'react';
import { 
    createSwitchNavigator, 
    createAppContainer 
} from 'react-navigation';

import AuthenticationNavigation from './AuthenticationNavigation';
import SideMenu from './SideMenu';

const AppNavigation = createAppContainer(createSwitchNavigator(
    {
        Authentication: {
            screen: AuthenticationNavigation
        },
        SideMenu: {
            screen: SideMenu
        }
    }
));

export default AppNavigation;