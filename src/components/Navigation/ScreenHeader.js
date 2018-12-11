import React, { Component } from 'react';
import {
  withNavigation,
  createStackNavigator,
  DrawerActions,
} from 'react-navigation';
import {
  Container,
  Header,
  Title,
  Left,
  Icon,
  Right,
  Button,
  Body,
  Content,
  Text,
  Card,
  CardItem,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from 'react-native';

import {
  createDrawerNavigator,
  createNavigationContainer,
} from 'react-navigation';
import { navStyles } from '../theme';

class DrawerHeader extends Component {
  render() {
    return (
      <Header style={styles.headerStyle}>
        <Left>
          <Button
            transparent
            onPress={() => this.props.navigation.dispatch(DrawerActions.toggleDrawer())
            }
          >
            <Ionicons name="ios-menu" size={26} color={'white'} />
          </Button>
        </Left>
        <Body>
          <Title style={styles.headerText}>{this.props.title}</Title>
        </Body>
        <Right />
      </Header>
    );
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: navStyles.BACKGROUND_COLOR,
  },
  headerText: {
    color: navStyles.FONT_COLOR,
  },
});

export default DrawerHeader;
