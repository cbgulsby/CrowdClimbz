import React from 'react';
import renderer from 'react-test-renderer';

import SearchProblems from '../screens/SearchProblems';


test('renders correctly', () => {
  const tree = renderer.create(<SearchProblems />).toJSON();
  expect(tree).toMatchSnapshot();
});