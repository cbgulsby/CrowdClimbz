import React from 'react';
import renderer from 'react-test-renderer';

import ChangeClimbAbility from '../screens/ChangeClimbAbility';


test('renders correctly', () => {
const tree = renderer.create(<ChangeClimbAbility />).toJSON();
expect(tree).toMatchSnapshot();
});