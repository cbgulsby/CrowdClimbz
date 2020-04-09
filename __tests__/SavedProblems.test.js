import React from 'react';
import renderer from 'react-test-renderer';

import SavedProblems from '../screens/SavedProblems';

test('renders correctly', () => {
  const tree = renderer.create(<SavedProblems />).toJSON();
  expect(tree).toMatchSnapshot();
});