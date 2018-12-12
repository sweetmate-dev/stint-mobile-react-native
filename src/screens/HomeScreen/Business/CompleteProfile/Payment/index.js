

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
import { ActionCreators } from '../../../../../redux/actions';
import NavigationService from '../../../../../navigation/NavigationService';
import ScreenHeader from '../../../../../components/Navigation/ScreenHeader';
import SearchInput from '../../../../../components/Input/SearchInput';
import { dySize, getFontSize } from '../../../../../utils/responsive';
import theme from '../../../../../theme';

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
  bottomView: {
    flex: 1,
    padding: dySize(15),
    backgroundColor: '#EEEEEE',
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

class CompletePaymentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {

  }

  onPressCredit = () => {
    NavigationService.navigate('AddPayment')
  }

  onPressSkip = () => {
    this.props.updateCompleteProfileState({ payment: true })
  }

  render() {
    

    return (
      <View style={styles.container}>
        <ScreenHeader
          backgroundColor={theme.colors.white}
          title="ADD PAYMENT DETAILS"
          leftIcon="md-arrow-back"
          onPressLeft={() => NavigationService.goBack()}
          textColor={theme.colors.black}
          borderBottomWidth={1}
        />
        <View style={styles.sectionView}>
          <Text style={styles.sectionText}>CHOOSE METHOD</Text>
        </View>
        <TouchableOpacity onPress={this.onPressCredit}>
          <View style={styles.clickableItemView}>
            <Text style={styles.buttonText}>CREDIT OR DEBIT CARD</Text>
            <Icon name="ios-arrow-forward" style={styles.icon} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onPressSkip}>
          <View style={styles.clickableItemView}>
            <Text style={styles.buttonText}>SKIP FOR NOW</Text>
            <Icon name="ios-arrow-forward" style={styles.icon} />
          </View>
        </TouchableOpacity>
        <View style={styles.bottomView}>
          <Text style={styles.bottomText}>If you have any questions with regards to how payment works, please get in touch with Stint HQ</Text>
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
}), mapDispatchToProps)(CompletePaymentScreen);


