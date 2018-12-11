
import 'react-native';
import React from 'react';
import LandingScreen from '../../screens/LandingScreen/LandingScreen'

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <LandingScreen />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});