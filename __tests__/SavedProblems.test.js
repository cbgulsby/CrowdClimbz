import React from 'react';
import renderer from 'react-test-renderer';

import SavedProblems from '../screens/SavedProblems';

// it('works', () => {
//     expect(1).toBe(1);
//   });


test('renders correctly', () => {
  const tree = renderer.create(<SavedProblems />).toJSON();
  expect(tree).toMatchSnapshot();
});