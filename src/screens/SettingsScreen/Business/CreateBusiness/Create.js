

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
    backgroundColor: '#FFFFFF',
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

class CreateBusinessScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {

  }

  onPressLogo = () => {
    NavigationService.navigate('CreateBusinessLogo')
  }

  onPressDetail = () => {
    NavigationService.navigate('CreateBusinessDetail');
  }

  onPressPayment = () => {
    NavigationService.navigate('CreateBusinessPayment');
  }

  render() {
    
    const { user: { hasBusiness } } = this.props;
    return (
      <View style={styles.container}>
        <ScreenHeader
          backgroundColor={theme.colors.white}
          title="CREATE YOUR BUSINESS"
          leftIcon="md-close"
          onPressLeft={() => NavigationService.goBack()}
          textColor={theme.colors.black}
          borderBottomWidth={1}
        />
        <View style={styles.sectionView}>
          <Text style={styles.sectionText}>WHAT'S LEFT?</Text>
        </View>
        {
          hasBusiness.logo ||
          <TouchableOpacity onPress={this.onPressLogo}>
            <View style={styles.clickableItemView}>
              <Text style={styles.buttonText}>ADD YOUR BUSINESS LOGO</Text>
              <Icon name="ios-arrow-forward" style={styles.icon} />
            </View>
          </TouchableOpacity>
        }
        {
          hasBusiness.detail ||
          <TouchableOpacity onPress={this.onPressDetail}>
            <View style={styles.clickableItemView}>
              <Text style={styles.buttonText}>PROVIDE BUSINESS DETAILS</Text>
              <Icon name="ios-arrow-forward" style={styles.icon} />
            </View>
          </TouchableOpacity>
        }
        {
          hasBusiness.payment ||
          <TouchableOpacity onPress={this.onPressPayment}>
            <View style={styles.clickableItemView}>
              <Text style={styles.buttonText}>ADD PAYMENT METHOD</Text>
              <Icon name="ios-arrow-forward" style={styles.icon} />
            </View>
          </TouchableOpacity>
        }
        {
          (hasBusiness.logo || hasBusiness.detail || hasBusiness.payment) &&
          <View style={styles.sectionView}>
            <Text style={styles.sectionText}>COMPLETED</Text>
          </View>
        }        
        {
          hasBusiness.logo &&
          <View style={styles.clickableItemView}>
            <Text style={styles.buttonText}>ADD YOUR BUSINESS LOGO</Text>
            <Icon name="md-checkmark" style={styles.checkIcon} />
          </View>
        }
        {
          hasBusiness.detail &&
          <View style={styles.clickableItemView}>
            <Text style={styles.buttonText}>PROVIDE BUSINESS DETAILS</Text>
            <Icon name="md-checkmark" style={styles.checkIcon} />
          </View>
        }
        {
          hasBusiness.payment &&
          <View style={styles.clickableItemView}>
            <Text style={styles.buttonText}>ADD PAYMENT METHOD</Text>
            <Icon name="md-checkmark" style={styles.checkIcon} />
          </View>
        }
        <View style={styles.bottomView}>
          <Text style={styles.bottomText}>Following the completion & verification of your profile, you will be able to start using all of Stint's functions.</Text>
        </View>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(state => ({
  user: state.user,
}), mapDispatchToProps)(CreateBusinessScreen);


