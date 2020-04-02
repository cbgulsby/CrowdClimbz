import React from 'react';
import renderer from 'react-test-renderer';

import SearchProblems from '../screens/SearchProblems';


// it('works', () => {
//     expect(1).toBe(1);
//   });


test('renders correctly', () => {
  const tree = renderer.create(<SearchProblems />).toJSON();
  expect(tree).toMatchSnapshot();
});