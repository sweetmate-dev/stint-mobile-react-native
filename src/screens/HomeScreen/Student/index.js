import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Drawer, Card, Content, CardItem, Body, Button } from 'native-base';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../redux/actions';
import SideBar from '../sidebar';
import { dySize, getFontSize } from '../../../utils/responsive';
import theme from '../../../theme';

const buttonIcon = require('../../../assets/images/ui/dots-square-dark.png');
const hamburgerIcon = require('../../../assets/images/ui/hamburger-dark.png');
const styles = StyleSheet.create({
  hamburgerButton: {
    // position: 'absolute',
    top: 15,
    left: 15,
  },
  hamburgerIcon: {
    width: dySize(24),
    height: dySize(24),
    resizeMode: 'contain'
  },
  contentView: {
    flex: 1,
    paddingBottom: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: getFontSize(40),
    letterSpacing: dySize(15),
    color: theme.colors.gray,
    fontWeight: 'bold'
  },
  subTitle: {
    fontSize: theme.FONT_SIZE_MEDIUM,
    letterSpacing: dySize(10),
    color: theme.colors.gray
  },
  startButton: {
    width: dySize(345),
    height: dySize(50),
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  buttonIcon: {
    width: dySize(15),
    height: dySize(15),
    resizeMode: 'stretch'
  },
  buttonText: {
    paddingHorizontal: 15,
    color: theme.colors.gray,
    fontSize: theme.FONT_SIZE_LARGE
  },
  subView: {
    height: dySize(180),
    paddingBottom: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

class StudentHomeScreen extends Component {

  closeDrawer() {
    this.drawer._root.close()
  };
  openDrawer() {
    this.drawer._root.open()
  };

  onStart() {
    alert('comming soon')
  }

  render() {
    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<SideBar />}
        onClose={() => this.closeDrawer()} >        
        <View style={{flex: 1}}>
          <Button 
            transparent
            style={styles.hamburgerButton}
            onPress={() => this.openDrawer()}>
            <Image source={hamburgerIcon} style={styles.hamburgerIcon} />
          </Button>
          <Content contentContainerStyle={styles.contentView}>
            <Text style={styles.title}>WELCOME</Text>
            <Text style={styles.subTitle}>Student Home Screen</Text>
          </Content>
        </View>
      </Drawer>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(state => ({
  user: state.user
}), mapDispatchToProps)(StudentHomeScreen);
