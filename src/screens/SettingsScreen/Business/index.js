

/* jshint esversion: 6 *//* jshint node: true */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import { Content, Icon } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../redux/actions';
import NavigationService from '../../../navigation/NavigationService';
import ScreenHeader from '../../../components/Navigation/ScreenHeader';
import SearchInput from '../../../components/Input/SearchInput';
import { dySize, getFontSize } from '../../../utils/responsive';
import theme from '../../../theme';


const LogOutIcon = require('../../../assets/images/ui/logout-dark-small.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    backgroundColor: '#EEEEEE'
  },
  sectionView: {
    backgroundColor: '#EEEEEE',
    padding: dySize(10),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightgray,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sectionText: {    
    fontSize: theme.FONT_SIZE_SMALL,
    fontFamily: 'Montserrat-Regular',    
  },
  clickableItemView: {
    backgroundColor: theme.colors.white,
    width: dySize(375),
    padding: dySize(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightgray
  },
  buttonText: {
    fontSize: getFontSize(14),
    fontFamily: 'Montserrat-Regular'
  },
  icon: {
    fontSize: theme.FONT_SIZE_MEDIUM,
  },
  logoutIcon: {
    width: dySize(18),
    height: dySize(18)
  },
  bottomView: {
    backgroundColor: '#EEEEEE',
    padding: dySize(15)
  },
  bottomText: {
    fontSize: theme.FONT_SIZE_MEDIUM,
    color: theme.colors.gray
  }
});

class BusinessSettingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {

  }

  render() {
    

    return (
      <View style={styles.container}>
        <ScreenHeader
          backgroundColor={theme.colors.white}
          title="SETTINGS"
          leftIcon="md-close"
          onPressLeft={() => NavigationService.goBack()}
          textColor={theme.colors.black}
          borderBottomWidth={1}
        />
        <Content style={styles.content} contentContainerStyle={styles.content}>
          <View style={styles.sectionView}>
            <Text style={styles.sectionText}>ACCOUNT</Text>
          </View>          
          <TouchableOpacity onPress={this.onPressPersonalDetails}>
            <View style={styles.clickableItemView}>
              <Text style={styles.buttonText}>PERSONAL DETAILS</Text>
              <Icon name="ios-arrow-forward" style={styles.icon} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onPressBusinessDetails}>
            <View style={styles.clickableItemView}>
              <Text style={styles.buttonText}>BUSINESS DETAILS</Text>
              <Icon name="ios-arrow-forward" style={styles.icon} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onPressPaymentDetails}>
            <View style={styles.clickableItemView}>
              <Text style={styles.buttonText}>PAYMENT DETAILS</Text>
              <Icon name="ios-arrow-forward" style={styles.icon} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onAddBusiness}>
            <View style={styles.clickableItemView}>
              <Text style={styles.buttonText}>ADD BUSINESS PROFILE</Text>
              <Icon name="ios-arrow-forward" style={styles.icon} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onPressViewTeam}>
            <View style={styles.clickableItemView}>
              <Text style={styles.buttonText}>VIEW YOUR TEAM</Text>
              <Icon name="ios-arrow-forward" style={styles.icon} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onPressInvite}>
            <View style={styles.clickableItemView}>
              <Text style={styles.buttonText}>INVITE A TEAM MEMBER</Text>
              <Icon name="ios-arrow-forward" style={styles.icon} />
            </View>
          </TouchableOpacity>
          <View style={styles.sectionView}>
            <Text style={styles.sectionText}>COMMUNICATION</Text>
          </View>
          <TouchableOpacity onPress={this.onPressHelp}>
            <View style={styles.clickableItemView}>
              <Text style={styles.buttonText}>HELP CENTRE</Text>
              <Icon name="ios-arrow-forward" style={styles.icon} />
            </View>
          </TouchableOpacity>
          <View style={styles.sectionView}>
            <Text style={styles.sectionText}>LEGAL</Text>
          </View>
          <TouchableOpacity onPress={this.onPressTerms}>
            <View style={styles.clickableItemView}>
              <Text style={styles.buttonText}>TERMS & CONDITIONS</Text>
              <Icon name="ios-arrow-forward" style={styles.icon} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onPressPrivacy}>
            <View style={styles.clickableItemView}>
              <Text style={styles.buttonText}>PRIVACY POLICY</Text>
              <Icon name="ios-arrow-forward" style={styles.icon} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onSignOut}>
            <View style={styles.clickableItemView}>
              <Text style={styles.buttonText}>SIGN OUT</Text>
              <Image source={LogOutIcon} style={styles.logoutIcon} />
            </View>
          </TouchableOpacity>
          <View style={styles.bottomView}>
            <Text style={styles.bottomText}>
              You can change your details in settings at anytime
            </Text>
          </View>
        </Content>
      </View>
    );
  }

  onPressPersonalDetails = () => {
    NavigationService.navigate('PersonalDetails')
  }

  onPressBusinessDetails = () => {
    NavigationService.navigate('BusinessDetails')
  }

  onPressPaymentDetails = () => {
    NavigationService.navigate('PaymentDetails');
  }

  onAddBusiness = () => {

  }

  onPressViewTeam = () =>{
    NavigationService.navigate('ShowTeamMember');
  }

  onPressInvite = () => {
    NavigationService.navigate('InviteMember');
  }

  onPressHelp = () => {
    NavigationService.navigate('HelpCenter');
  }

  onPressTerms = () => {
    NavigationService.navigate('TermsAndConditions');
  }

  onPressPrivacy = () => {
    NavigationService.navigate('PrivacyPolicy');
  }

  onSignOut = () => {
    NavigationService.navigate('Welcome')
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(state => ({
  appState: state.appState,
}), mapDispatchToProps)(BusinessSettingScreen);


