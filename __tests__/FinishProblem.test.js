import React from 'react';
import renderer from 'react-test-renderer';
import {checkName, checkGym} from '../screens/FinishProblem';

test('Entered problem with no name', () => {
 	expect(checkName("")).toBe(1);
 });

test('Entered too long of problem name', () => {
	expect(checkName("abcdefghijklmnopqrstuvwxyz")).toBe(2);
});

test('Did not add gym name to problem', () => {
	expect(checkGym("")).toBe(1);
});