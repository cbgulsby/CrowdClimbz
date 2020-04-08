import React from 'react';
import renderer from 'react-test-renderer';

import ChangePassword from '../screens/ChangePassword';


test('renders correctly', () => {
const tree = renderer.create(<ChangePassword />).toJSON();
expect(tree).toMatchSnapshot();
});

// import passwordCheck from '../screens/ChangePassword';

// test('entered password too short', () => {
// 	expect(passwordCheck("hi")).toBe(1);
// });