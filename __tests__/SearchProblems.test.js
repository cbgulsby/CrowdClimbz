import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import SearchProblems from '../screens/SearchProblems';


test('renders correctly', () => {
  const tree = renderer.create(<SearchProblems />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('hook test', () => {
  let SearchProblemData= renderer.create(<SearchProblems />);
  let SearchProblemInstance = SearchProblemData.root;
  console.log("=> ", SearchProblemInstance.props);


})