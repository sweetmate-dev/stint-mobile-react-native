

/* jshint esversion: 6 *//* jshint node: true */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import CheckBox from 'react-native-checkbox';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../redux/actions';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import ScreenHeader from '../../components/Navigation/ScreenHeader';
import ValidationInput from '../../components/Input/ValidationInput';
import ButtonWithIcon from '../../components/Button/ButtonWithIcon';
import NavigationService from '../../navigation/NavigationService';
import theme from '../../theme';
import { dySize } from '../../utils/responsive';
import * as Operators from '../../utils/operators';

const styles = StyleSheet.create({

  container: {
    padding: dySize(20),
    borderTopWidth: 1,
    borderTopColor: theme.colors.lightgray
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
  }
});

class SignUpBusinessScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirm: '',
      checked: false,
      error: {
        password: false,
        confirm: false
      }
    };
  }

  componentDidMount() {

  }

  render() {
    const { firstName, lastName, email, password, confirm, checked, error } = this.state;

    return (
      <Container>        
        <ScreenHeader
          backgroundColor={theme.colors.white}
          title="REGISTER AS A BUSINESS"
          leftIcon="md-arrow-back"
          rightText="SIGN IN"
          onPressLeft={() => NavigationService.goBack()}
          onPressRight={() => NavigationService.navigate('SignIn')}
          textColor={theme.colors.black}
        />
        <Content contentContainerStyle={styles.container}>
          <ValidationInput
            label="FIRST NAME"
            value={firstName}
            onChange={(text) => this.setState({firstName: text.replace(/ /g, '')})}            
          />
          <ValidationInput
            label="LAST NAME"
            value={lastName}
            onChange={(text) => this.setState({lastName: text.replace(/ /g, '')})}
          />
          <ValidationInput
            label="E-MAIL"
            value={email}
            onChange={(email) => this.setState({email})}
            isError={error.email}
          />
          <ValidationInput
            label="PASSWORD"
            value={password}
            onChange={(text) => this.setState({password: text.replace(/ /g, '')})}
            keyboardtype="visible-password"
            isSecure={true}
            isError={error.password}
            errorText="PASSWORD MUST BE OVER 6 IN LENGTH"
          />
          <ValidationInput
            label="CONFIRM PASSWORD"
            isError={error.confirm}
            errorText="PASSWORD DOES NOT MATCH THE CONFIRM PASSWORD"
            value={confirm}
            onChange={(text) => this.setState({confirm: text.replace(/ /g, '')})}
            keyboardtype="visible-password"
            isSecure={true}
          />
          <View style={styles.checkboxView}>
            <CheckBox
              label=''
              checked={checked}
              onChange={(checked) => this.setState({checked: !checked})}
            />
            <View style={styles.checkContainer}>
              <View style={styles.checkLabelView}>
                <Text style={styles.checkLabelText}>I READ AND ACCEPT THE </Text>
                <TouchableOpacity onPress={this.gotoService}>
                  <Text style={styles.linkText}>SERVICE AGREEMENT</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.checkLabelView}>
                <Text style={styles.checkLabelText}>&</Text>
                <TouchableOpacity onPress={this.gotoPrivacy}>
                  <Text style={styles.linkText}>PRIVACY POLICY</Text>
                </TouchableOpacity>
              </View>
            </View>            
          </View>
          <ButtonWithIcon
              text="NEXT"
              onPress={this.onPressNext}
          />
        </Content>
      </Container>
    );
  }

  checkValidation() {
    const { firstName, lastName, email, password, confirm, checked } = this.state;
    const error = {
      email: !Operators.emailValidation(email),
      password: password.length < 6,
      confirm: password !== confirm
    }
    this.setState({error})
    if(firstName.length === 0) return false;
    if(lastName.length === 0) return false;
    if(email.length < 0 || !Operators.emailValidation(email)) return false;
    if(password.length < 6) return false;
    if(password !== confirm) return false;
    if(!checked) return false;
    return true
  }

  onPressNext = () => {
    const { temp: {signUpUser: {email}} } = this.props;
    const { firstName, lastName, mobilePhone, password } = this.state; 
    if(!this.checkValidation()) return;
    this.props.setSignUpUser({
      firstName,
      lastName,
      mobilePhone,
      email,
      password
    })
    NavigationService.navigate('Verify');
  }

  gotoService = () => {
    alert('service')
  }

  gotoPrivacy = () => {
    alert('privacy')
  }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ActionCreators, dispatch);
  }
export default connect(state => ({
  temp: state.temp,
}), mapDispatchToProps)(SignUpBusinessScreen);

