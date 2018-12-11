import React, { Component } from 'react';
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
  List,
  ListItem,
} from 'native-base';

import {
  AsyncStorage,
  ScrollView,
  View,
  StyleSheet,
  FlatList,
  Platform,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {
  NavigationActions, DrawerActions, withNavigation, DrawerItems,
} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
// import { signOut } from '../utils/loginUtils';


class DrawerContent extends Component {
  navigateToScreen = route => () => {
    const navigate = NavigationActions.navigate({
      routeName: route,
    });
    this.props.navigation.dispatch(navigate);
  }

  render() {
    return (
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>

      <Container style={styles.container}>
        <Header style={[styles.drawerHeaderStyle, styles.androidHeader]}>
          <Left style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="ios-person" style={{ color: 'white' }} size={24} />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 22,
                color: 'white',
                fontStyle: 'italic',
              }}
            >
              Hello
            </Text>
          </Left>
        </Header>
        <Content>
          <View style={{ flex: 1 }}>
            <View>
              <TouchableOpacity
                style={styles.drawerMenuLink}
                onPress={this.navigateToScreen('Home')}
              >
                <Ionicons style={styles.drawerIcon} name="ios-home" size={24} />
                <Text style={styles.drawerMenuTextLink}>Dashboard</Text>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                style={styles.drawerMenuLink}
                onPress={this.navigateToScreen('Projects')}
              >
                <Ionicons name="ios-list" size={24} />
                <Text style={styles.drawerMenuTextLink}>Projects</Text>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                style={styles.drawerMenuLink}
                onPress={this.navigateToScreen('Business')}
              >
                <Entypo name="add-to-list" size={24} />
                <Text style={styles.drawerMenuTextLink}>Business</Text>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                style={styles.drawerMenuLink}
                onPress={this.navigateToScreen('Settings')}
              >
                <Ionicons name="ios-map" size={24} />
                <Text style={styles.drawerMenuTextLink}>Settings</Text>
              </TouchableOpacity>
            </View>


            <View>
              <TouchableOpacity
                style={styles.drawerMenuLink}
                onPress={this.navigateToScreen('Support')}
              >
                <Ionicons name="ios-settings" size={24} />
                <Text style={styles.drawerMenuTextLink}>Support</Text>
              </TouchableOpacity>
            </View>


            <View>
              <TouchableOpacity
                style={styles.drawerMenuLink}
                onPress={this.navigateToScreen('LoginScreen')}
              >
                <Entypo name="login" size={24} />
                <Text style={styles.drawerMenuTextLink}>Login</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.signOut}>
              <Button
                onPress={() => {
                  //   signOut();
                //  this.props.client.resetStore();
                }}
              >
                <Text>Sign Out</Text>
              </Button>
            </View>
          </View>
        </Content>
      </Container>
      </SafeAreaView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 35,
    flex: 1,
  },

  drawerIcon: {},

  drawerMenuLink: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d5deed',
    padding: 10,
    borderBottomColor: 'white',
    borderBottomWidth: 3,
  },

  drawerMenuTextLink: {
    marginLeft: 20,
    fontSize: 20,
    color: '#3a455c',
  },

  signOut: {
    alignSelf: 'center',

    alignItems: 'flex-end',
  },

  drawerHeaderStyle: {
    backgroundColor: '#3a455c',
    height: 90,
  },

  androidHeader: {
    ...Platform.select({
      android: {
        paddingTop: StatusBar.currentHeight,
      },
    }),
  },
});

export default DrawerContent;
