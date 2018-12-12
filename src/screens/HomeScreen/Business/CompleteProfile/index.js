

/* jshint esversion: 6 *//* jshint node: true */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../../redux/actions';
import NavigationService from '../../../../navigation/NavigationService';
import ScreenHeader from '../../../../components/Navigation/ScreenHeader';
import SearchInput from '../../../../components/Input/SearchInput';
import { dySize, getFontSize } from '../../../../utils/responsive';
import theme from '../../../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
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
    letterSpacing: dySize(4)  
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
    fontFamily: 'Montserrat-Medium'
  },
  icon: {
    fontSize: theme.FONT_SIZE_MEDIUM,
  },
  checkIcon: {
    fontSize: theme.FONT_SIZE_MEDIUM,
    color: theme.colors.green
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

class CompleteProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    };
  }

  componentDidMount() {
    
  }

  render() {
    const { user: { completedProfile } } = this.props;
    return (
      <View style={styles.container}>
        <ScreenHeader
          backgroundColor={theme.colors.white}
          title="COMPLETE PROFILE"
          leftIcon="md-close"
          onPressLeft={() => NavigationService.goBack()}
          textColor={theme.colors.black}
          borderBottomWidth={1}
        />
        <View style={styles.sectionView}>
          <Text style={styles.sectionText}>WHAT'S LEFT?</Text>
        </View>
        {
          completedProfile.photo ||
          <TouchableOpacity onPress={this.onPressPhoto}>
            <View style={styles.clickableItemView}>
              <Text style={styles.buttonText}>ADD A PROFILE PHOTO</Text>
              <Icon name="ios-arrow-forward" style={styles.icon} />
            </View>
          </TouchableOpacity>
        }
        {
          completedProfile.payment ||
          <TouchableOpacity onPress={this.onPressPayment}>
            <View style={styles.clickableItemView}>
              <Text style={styles.buttonText}>ADD A PAYMENT METHOD</Text>
              <Icon name="ios-arrow-forward" style={styles.icon} />
            </View>
          </TouchableOpacity>
        }
        {
          completedProfile.mobile ||
          <TouchableOpacity onPress={this.onPressMobile}>
            <View style={styles.clickableItemView}>
              <Text style={styles.buttonText}>ADD YOUR MOBILE NUMBER</Text>
              <Icon name="ios-arrow-forward" style={styles.icon} />
            </View>
          </TouchableOpacity>
        }
        <View style={styles.sectionView}>
          <Text style={styles.sectionText}>COMPLETED</Text>
        </View>
        <View style={styles.clickableItemView}>
          <Text style={styles.buttonText}>SIGN UP</Text>
          <Icon name="md-checkmark" style={styles.checkIcon} />
        </View>
        {
          completedProfile.photo &&
          <View style={styles.clickableItemView}>
            <Text style={styles.buttonText}>ADD A PROFILE PHOTO</Text>
            <Icon name="md-checkmark" style={styles.checkIcon} />
          </View>
        }
        {
          completedProfile.payment &&
          <View style={styles.clickableItemView}>
            <Text style={styles.buttonText}>ADD A PAYMENT METHOD</Text>
            <Icon name="md-checkmark" style={styles.checkIcon} />
          </View>
        }
        {
          completedProfile.mobile &&
          <View style={styles.clickableItemView}>
            <Text style={styles.buttonText}>ADD YOUR MOBILE NUMBER</Text>
            <Icon name="md-checkmark" style={styles.checkIcon} />
          </View>
        }
        <View style={styles.bottomView}>
          <Text style={styles.bottomText}>Following the completion & verification of your profile, you will be able to start using all of Stint's functions.</Text>
        </View>
      </View>
    );
  }

  onPressPhoto = () => {
    NavigationService.navigate('CompletePhoto');
  }

  onPressPayment = () => {
    NavigationService.navigate('CompletePayment');
  }

  onPressMobile = () => {
    NavigationService.navigate('CompleteMobile');
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(state => ({
  user: state.user,
  router: state.router
}), mapDispatchToProps)(CompleteProfileScreen);


