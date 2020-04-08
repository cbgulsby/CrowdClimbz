import React from 'react';
import renderer from 'react-test-renderer';

import ChangePreferredGym from '../screens/ChangePreferredGym';


test('renders correctly', () => {
const tree = renderer.create(<ChangePreferredGym />).toJSON();
expect(tree).toMatchSnapshot();
});