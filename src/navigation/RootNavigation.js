import React, { Component } from 'react';
import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  createSwitchNavigator,
  createDrawerNavigator,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DrawerContent from './DrawerContent';

// import { BusinessHomeScreen, StudentHomeScreen } from 'screens'
import { BusinessHomeScreen, StudentHomeScreen, LandingScreen } from '../screens';

const HomeStack = createStackNavigator(
  {
    StudentHomeScreen: {
      screen: StudentHomeScreen,
    },
    BusinessHomeScreen: {
      screen: BusinessHomeScreen,
    },
  },
  {
    initialRouteName: 'StudentHomeScreen',
  },
);

const RootSwitchNavigation = (signedIn = false) => createSwitchNavigator(
  {
    SignedIn: {
      screen: SignedInScreen,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    SignedOut: {
      screen: SignedOutScreen,
    },
  },
  {
    initialRouteName: signedIn ? 'SignedIn' : 'SignedOut',
  },
);

const RootNavigation = createDrawerNavigator({
  Home: {
    screen: HomeStack,
  },
});

export default RootNavigation;
