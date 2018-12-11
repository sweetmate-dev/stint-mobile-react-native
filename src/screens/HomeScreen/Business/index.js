import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Drawer, Card, Content, Icon, CardItem, Body, Button } from 'native-base';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../redux/actions';
import SideBar from '../sidebar';
import { dySize, getFontSize } from '../../../utils/responsive';
import theme from '../../../theme';
import NavigationService from '../../../navigation/NavigationService';
import ScreenHeader from '../../../components/Navigation/ScreenHeader';

const buttonIcon = require('../../../assets/images/ui/dots-square-dark.png');
const hamburgerIcon = require('../../../assets/images/ui/hamburger-dark.png');
const styles = StyleSheet.create({
  hamburgerButton: {
    position: 'absolute',
    top: dySize(17),
    left: dySize(15),
  },
  hamburgerIcon: {
    width: dySize(24),
    height: dySize(24),
    resizeMode: 'contain'
  },
  contentView: {
    flex: 1,
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
    fontSize: theme.FONT_SIZE_MEDIUM,
    fontFamily: 'Montserrat-Regular'
  },
  subView: {
    height: dySize(180),
    paddingBottom: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    backgroundColor: '#EEEEEE',
  },
  sectionText: {
    fontSize: theme.FONT_SIZE_SMALL,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    padding: dySize(10)
  },
  clickableItemView: {
    backgroundColor: theme.colors.white,
    width: dySize(375),
    padding: dySize(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: theme.colors.lightgray
  },
  itemText: {
    fontSize: getFontSize(14),
    fontFamily: 'Montserrat-Medium'
  },
  icon: {
    fontSize: theme.FONT_SIZE_MEDIUM,
  },
  bottomView: {
    padding: dySize(15),
    backgroundColor: 'transparent',
    borderTopWidth: 1,
    borderTopColor: theme.colors.lightgray
  },
  bottomText: {
    fontSize: theme.FONT_SIZE_SMALL,
    fontFamily: 'LibreBaskerville-Regular',
    color: theme.colors.gray,
    lineHeight: dySize(22)   
  }
});

class BusinessHomeScreen extends Component {

  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this.drawer._root.open()
  };

  onStart = () => {
    NavigationService.navigate('Post')
  }

  completedProfile = () => {
    const { user: { completedProfile, hasBusiness } } = this.props;
    return completedProfile.photo && completedProfile.payment && completedProfile.mobile
  }

  onPressProfile = () => {
    NavigationService.navigate('CompleteProfile');
  }

  onPressBusiness = () => {
    NavigationService.navigate('CreateBusiness');
  }

  render() {
    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<SideBar onNavigate={this.closeDrawer}/>}
        onClose={() => this.closeDrawer()} >        
        { 
          this.completedProfile() ?
          this.renderCommonContent()
          :this.renderContentForNewUsers()
        }        
      </Drawer>
    );
  }

  renderContentForNewUsers = () => {
    return (
      <View style={{flex: 1}}>
        <ScreenHeader
          backgroundColor={theme.colors.white}
          title="COMPLETE PROFILE"
          textColor={theme.colors.black}
          borderBottomWidth={1}
        />
        <Button 
          transparent
          style={styles.hamburgerButton}
          onPress={() => this.openDrawer()}>
          <Image source={hamburgerIcon} style={styles.hamburgerIcon} />
        </Button>
        <View style={styles.content}>
          <Text style={styles.sectionText}>WHAT'S LEFT?</Text>
          <TouchableOpacity onPress={this.onPressProfile}>
            <View style={styles.clickableItemView}>
              <Text style={styles.itemText}>COMPLETE INDIVIDUAL PROFILE</Text>
              <Icon name="ios-arrow-forward" style={styles.icon} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onPressBusiness}>
            <View style={styles.clickableItemView}>
              <Text style={styles.itemText}>CREATE YOUR BUSINESS</Text>
              <Icon name="ios-arrow-forward" style={styles.icon} />
            </View>
          </TouchableOpacity>
          <View style={styles.bottomView}>
            <Text style={styles.bottomText}>Following the completion & verification of your profile, you will be able to start using all of Stint's functions.</Text>
          </View>
        </View>
      </View>
    )
  }

  renderCommonContent = () => {
    return (
      <View style={{flex: 1}}>        
        <Content contentContainerStyle={styles.contentView}>
          <View style={styles.subView}>
            <Text style={styles.title}>STINT</Text>
            <Text style={styles.subTitle}>PEOPLE POWER</Text>
          </View>            
          <Card>
            <CardItem style={styles.startButton}>
              <TouchableOpacity onPress={() => this.onStart()}>
                <View style={styles.startButton}>
                  <Image source={buttonIcon} style={styles.buttonIcon} />
                  <Text style={styles.buttonText}>What Do You Need?</Text>
                </View>
              </TouchableOpacity>                  
            </CardItem>
          </Card>
          <View style={styles.subView}>
          </View>  
        </Content>
        <Button 
          transparent
          style={styles.hamburgerButton}
          onPress={() => this.openDrawer()}>
          <Image source={hamburgerIcon} style={styles.hamburgerIcon} />
        </Button>
      </View>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(state => ({
  user: state.user
}), mapDispatchToProps)(BusinessHomeScreen);
