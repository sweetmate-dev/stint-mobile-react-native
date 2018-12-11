

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
import ButtonWithIcon from '../../../../../components/Button/ButtonWithIcon';
import { dySize, getFontSize } from '../../../../../utils/responsive';
import theme from '../../../../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  generalView: {
    height: dySize(40),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
  },
  generalText: {
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
    borderTopWidth: 1,
    borderTopColor: theme.colors.lightgray
  },
  buttonText: {
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
    borderTopColor: theme.colors.lightgray,
    justifyContent: 'space-between',
    flex: 1,
  },
  bottomText: {
    fontSize: theme.FONT_SIZE_SMALL,
    fontFamily: 'LibreBaskerville-Regular',
    color: theme.colors.gray,  
    lineHeight: dySize(22)  
  },
  checkView: {
    width: dySize(15),
    height: dySize(15),
    borderWidth: 1,
    borderColor: theme.colors.black,
    padding: dySize(2)
  },
  checkIcon: {
    width: dySize(9),
    height: dySize(9),
    backgroundColor: theme.colors.black
  }
});

class CreateBusinessPaymentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };
  }

  componentDidMount() {

  }

  onPressCredit = () => {
    NavigationService.navigate('CreateBusinessPaymentCreate');
  }

  onPressPayment = () => {
    this.setState({selected: !this.state.selected})
  }

  onPressSkip = () => {
    this.props.updateCompleteBusinessState({ payment: true })
  }

  render() {
    

    return (
      <View style={styles.container}>
        <ScreenHeader
          backgroundColor={theme.colors.white}
          title="ADD PAYMENT DETAIL"
          leftIcon="md-arrow-back"
          rightText="SKIP"
          onPressLeft={() => NavigationService.goBack()}
          onPressRight={this.onPressSkip}
          textColor={theme.colors.black}
          borderBottomWidth={1}
        />
        <View style={styles.generalView}>
          <Text style={styles.generalText}>CURRENT LOCATION</Text>
        </View>
        <TouchableOpacity onPress={this.onPressCredit}>
          <View style={styles.clickableItemView}>
            <Text style={styles.buttonText}>CREDIT OR DEBIT CARD</Text>
            <Icon name="ios-arrow-forward" style={styles.icon} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onPressPayment}>
          <View style={styles.clickableItemView}>
            <Text style={styles.buttonText}>DIRECT DEBIT PAYER</Text>
            <View style={styles.checkView}>
              { this.state.selected && <View style={styles.checkIcon} /> }
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.bottomView}>
          <Text style={styles.bottomText}>Following the completion & verification of your profile, you will be able to start using all of Stint's functions.</Text>
          {
            this.state.selected &&
            <ButtonWithIcon
              text="NEXT"
              onPress={this.onPressNext}
            />
          }          
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
}), mapDispatchToProps)(CreateBusinessPaymentScreen);


