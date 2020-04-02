import React from 'react';
import renderer from 'react-test-renderer';

import ProblemCard from '../components/ProblemCard';

// it('works', () => {
//     expect(1).toBe(1);
//   });


test('renders correctly', () => {
  const tree = renderer.create(<ProblemCard />).toJSON();
  expect(tree).toMatchSnapshot();
});