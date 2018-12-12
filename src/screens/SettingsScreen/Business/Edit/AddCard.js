

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
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../../redux/actions';
import NavigationService from '../../../../navigation/NavigationService';
import ScreenHeader from '../../../../components/Navigation/ScreenHeader';
import SearchInput from '../../../../components/Input/SearchInput';
import ValidationInput from '../../../../components/Input/ValidationInput';
import ButtonWithIcon from '../../../../components/Button/ButtonWithIcon';
import { dySize } from '../../../../utils/responsive';
import theme from '../../../../theme';
import { Content } from 'native-base';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  inputContainer: {
    padding: dySize(15),
    paddingBottom: dySize(30)
  },
  inputView: {
    marginVertical: 5,
    width: dySize(345)
  },
  bottomView: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    padding: dySize(15),
    borderTopWidth: 1,
    borderTopColor: theme.colors.lightgray,
    justifyContent: 'space-between'
  },
  bottomText: {
    fontSize: theme.FONT_SIZE_SMALL,
    fontFamily: 'LibreBaskerville-Regular',
    color: theme.colors.gray,
    lineHeight: dySize(22),
    marginBottom: dySize(30)
  },
});

class BusinessDetailsAddCardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      number: '',
      expireDate: '',
      cvv: '',
      error: {
        name: false,
        number: false,
        expireDate: false,
        cvv: false
      }
    };
  }

  componentDidMount() {

  }

  splice(mystr, idx, rem, str) {
    return mystr.slice(0, idx) + str + mystr.slice(idx + Math.abs(rem));
  };

  onChangeNumber = (number) => {
    if(
      number.length === 4 ||
      number.length === 9 ||
      number.length === 14 ||
      number.length === 19
    )
    this.setState({number: number + ' '})
  }

  onChangeDate = (dateString) => {
    if(dateString.length === 2) {
      this.setState({expireDate: dateString + '/'})
    } else if(dateString.length === 3) {
      this.setState({expireDate: dateString.substring(0, 1)})
    }
  }

  onPressNext = () => {
    //Add payment function here
    this.props.updateCompleteProfileState({ payment: true })
  }

  render() {
    
    const { name, number, expireDate, cvv, error } = this.state;
    return (
      <View style={styles.container}>
        <ScreenHeader
          backgroundColor={theme.colors.white}
          title="CREDIT OR DEBIT CARD"
          leftIcon="md-arrow-back"
          onPressLeft={() => NavigationService.goBack()}
          textColor={theme.colors.black}
          borderBottomWidth={1}
        />
        <Content contentContainerStyle={{flex: 1}}>
          <View style={styles.inputContainer}>
            <ValidationInput
              label='NAME ON CARD'
              isError={error.name}
              onChange={(name) => this.setState({name})}
              value={name}
              errorText='PLEASE PROVIDE VALID HOLDER NAME'
              style={styles.inputView}
            />
            <ValidationInput
              label='CARD NUMBER'
              isError={error.number}
              onChange={this.onChangeNumber}
              value={number}
              errorText='PLEASE PROVIDE VALID CREDIT CARD NUMBER'
              style={styles.inputView}
              maxLength={24}
              keyboardType="number-pad"
            />
            <ValidationInput
              label='EXPIRY DATE (MM/YY)'
              isError={error.expireDate}
              onChange={this.onChangeDate}
              value={expireDate}
              errorText='PLEASE PROVIDE VALID MONTH'
              style={styles.inputView}
              maxLength={5}
              keyboardType="number-pad"
            />
            <ValidationInput
              label='CVV'
              isError={error.cvv}
              onChange={(cvv) => this.setState({cvv})}
              value={cvv}
              errorText='PLEASE PROVIDE VALID CVC NUMBER'
              style={styles.inputView}
              maxLength={10}
            />
          </View>
          <View style={styles.bottomView}>
            <Text style={styles.bottomText}>If there are any questions you have with regards to how payment works please get in touch with Stint HQ.</Text>
            <ButtonWithIcon
              text="ADD CARD"
              onPress={this.onPressNext}
            />
          </View>
        </Content>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(state => ({
  user: state.user,
}), mapDispatchToProps)(BusinessDetailsAddCardScreen);


