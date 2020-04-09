import React from 'react';
import renderer from 'react-test-renderer';

import ProblemCard from '../components/ProblemCard';

test('renders correctly', () => {
  const tree = renderer.create(<ProblemCard />).toJSON();
  expect(tree).toMatchSnapshot();
});