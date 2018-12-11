

/* jshint esversion: 6 *//* jshint node: true */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import CheckBox from 'react-native-checkbox';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../../redux/actions';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import ScreenHeader from '../../../../components/Navigation/ScreenHeader';
import ValidationInput from '../../../../components/Input/ValidationInput';
import ButtonWithIcon from '../../../../components/Button/ButtonWithIcon';
import NavigationService from '../../../../navigation/NavigationService';
import theme from '../../../../theme';
import { dySize, getFontSize } from '../../../../utils/responsive';
import { EUROPE_COUNTRIES } from '../../../../constants';

const styles = StyleSheet.create({

  container: {
    backgroundColor: '#EEEEEE',
  },
  content: {
    backgroundColor: theme.colors.white,
  },
  checkboxView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkLabelView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: dySize(20),
    marginBottom: dySize(5)
  },
  checkContainer: {
    marginVertical: 30
  },
  checkLabelText: {
    fontSize: theme.FONT_SIZE_SMALL,
    fontFamily: 'Montserrat-Regular',
    color: theme.colors.gray
  },
  linkText: {
    fontSize: theme.FONT_SIZE_SMALL,
    fontFamily: 'Montserrat-Regular',
    color: theme.colors.blue,
    textDecorationLine: 'underline'
  },
  buttonView: {
    padding: dySize(15),
    backgroundColor: '#EEEEEE'
  },
  bottomTextView: {
    padding: dySize(15),
    backgroundColor: '#EEEEEE',
  },
  bottomText: {
    color: theme.colors.gray,
    fontSize: theme.FONT_SIZE_SMALL,
    fontFamily: 'LibreBaskerville-Regular'
  },
  inputView: {
    padding: dySize(15),
  },
  country: {
    fontSize: getFontSize(24),
    fontFamily: 'LibreBaskerville-Italic',
    color: theme.colors.gray,
    flex: 1,
  },
  countryView: {
    marginVertical: dySize(10),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightgray,
  },
  countryText: {
    fontSize: theme.FONT_SIZE_SMALL,
    fontFamily: 'Montserrat-Regular',
  },
  pickerView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  flag: {
    width: dySize(30),
    height: dySize(20),
    resizeMode: 'contain',
    marginRight: dySize(10)
  },
  arrowIcon: {
    fontSize: theme.FONT_SIZE_LARGE,
  }
});

class CompleteBusinessDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      city: '',
      code: '',
      mobile: false,
      error: {
        name: false,
        address: false,
        city: false,
        code: false,
      }
    };
  }

  componentDidMount() {

  }

  onClickFlag = () => {
    NavigationService.navigate('CreateBusinessSelectCountry');
  }

  render() {
    const { name, address, city, code, mobile, error } = this.state;
    const { user: { country }} = this.props;
    return (
      <Container style={styles.container}>        
        <ScreenHeader
          backgroundColor={theme.colors.white}
          title="BUSINESS DETAILS"
          leftIcon="md-arrow-back"
          onPressLeft={() => NavigationService.goBack()}
          textColor={theme.colors.black}
          borderBottomWidth={1}
        />
        <Content contentContainerStyle={styles.content}>
          <View style={styles.inputView}>          
            <ValidationInput
              label="BUSINESS NAME"
              value={name}
              onChange={(name) => this.setState({name})}
            />
            <ValidationInput
              label="FIRST LINE ADDRESS"
              value={address}
              onChange={(address) => this.setState({address})}
              maxLength={80}
            />
            <ValidationInput
              label="CITY"
              value={city}
              onChange={(city) => this.setState({city})}
              isError={error.mobilePhone}
              errorText="PLEASE SPECIFY A VALID CITY"
            />
            <View style={styles.countryView}>
              <Text style={styles.countryText}>COUNTRY</Text>
              <TouchableOpacity onPress={this.onClickFlag}>              
                <View style={styles.pickerView}>
                  <Image source={EUROPE_COUNTRIES[country]['flag']} style={styles.flag} />
                  <Text style={styles.country}>{EUROPE_COUNTRIES[country]['label']}</Text>
                  <Icon name="ios-arrow-down" style={styles.arrowIcon} />
                </View>
              </TouchableOpacity>
            </View>
            <ValidationInput
              label="POST CODE"
              value={code}
              onChange={(code) => this.setState({code})}
              errorText="PLEASE SPECIFY A VALID POSTCODE"
            />
            <ValidationInput
              label="MOBILE NUMBER"
              value={mobile}
              onChange={(mobile) => this.setState({mobile})}
              keyboardtype="phone-pad"
              isError={error.mobile}
              errorText="PLEASE SPECIFY A VALID PHONE NUMBER"
            />
          </View>
          <View style={styles.bottomTextView}>
            <Text style={styles.bottomText}>We need the above information about your business to verify it as a Stint Employer.</Text>
          </View>
        </Content>
        <View style={styles.buttonView}>
          <ButtonWithIcon
            text="NEXT"
            onPress={this.onPressNext}
          />
        </View>          
      </Container>
    );
  }

  checkValidation() {
    const { name, address, city, code, mobile } = this.state;
    const error = {
      mobile: mobile.length < 11,
      address: address.length < 10,
      code: code.length < 4
    }
    this.setState({error})
    if(name.length === 0) return false;
    if(address.length < 10) return false;
    if(city.length === 0) return false;
    if(code.length < 4) return false;
    if(mobile.length < 11) return false;
    return true
  }

  onPressNext = () => {
    const { name, address, city, code, mobile } = this.state; 
    if(this.checkValidation()) return;
    // set business detail function here
    this.props.updateCompleteBusinessState({ detail: true })
  }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ActionCreators, dispatch);
  }
export default connect(state => ({
  user: state.user,
}), mapDispatchToProps)(CompleteBusinessDetailScreen);

