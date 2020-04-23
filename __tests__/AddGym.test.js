import React from 'react';
import renderer from 'react-test-renderer';
import {checkInfo, checkLatitude, checkLongitude} from '../screens/AddGym';

test('Entered Gym with missing info', () => {
 	expect(checkInfo("")).toBe(1);
 });

test('Entered latitude that is not a number', () => {
	expect(checkLatitude("lat")).toBe(1);
});

test('Entered latitude that is less than -90', () => {
	expect(checkLatitude(-90.1)).toBe(1);
});

test('Entered latitude that is above 90', () => {
	expect(checkLatitude(90.1)).toBe(1);
});

test('Entered longitude that is not a number', () => {
	expect(checkLongitude("long")).toBe(1);
});

test('Entered longitude that is below -180', () => {
	expect(checkLatitude(-180.1)).toBe(1);
});

test('Entered longitude that is above 180', () => {
	expect(checkLatitude(180.1)).toBe(1);
});