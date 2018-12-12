

/* jshint esversion: 6 *//* jshint node: true */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../redux/actions';
import { Container, Icon, Content } from 'native-base';
import ScreenHeader from '../../components/Navigation/ScreenHeader';
import ButtonWithIcon from '../../components/Button/ButtonWithIcon';
import ValidationInput from '../../components/Input/ValidationInput';
import NavigationService from '../../navigation/NavigationService';
import theme from '../../theme';
import { dySize } from '../../utils/responsive';
import * as Operators from '../../utils/operators';

const Background = require('../../assets/images/verification/location-employee.png');
const buttonIcon = require('../../assets/images/welcome-screen/string-logo-top-light.png')
const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  image: {
    width: dySize(375),
    height: dySize(377),
    resizeMode: 'stretch',
    marginTop: -70,
    zIndex: -1
  },
  bottomView: {
    flex: 1,
    padding: 15,
  },
  description: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  descriptionText: {
    fontSize: theme.FONT_SIZE_LARGE,
    fontFamily: 'LibreBaskerville-Regular',
    color: theme.colors.gray,
    textAlign: 'center',
    lineHeight: dySize(30)
  },
  stintText: {
    fontSize: theme.FONT_SIZE_LARGE,
    fontFamily: 'LibreBaskerville-Italic',
    color: theme.colors.gray,
    textAlign: 'center'
  },
  selectButton: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightgray,
    height: dySize(40),
    justifyContent: 'center',
    marginBottom: 15,
  },
  selectButtonText: {
    fontSize: theme.FONT_SIZE_MEDIUM,
    fontFamily: 'Montserrat-Regular',
    color: theme.colors.lightgray
  },
  selectIconView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectIconText: {
    fontSize: theme.FONT_SIZE_MEDIUM,
    fontFamily: 'LibreBaskerville-Italic'
  },
  selectIcon: {
    fontSize: theme.FONT_SIZE_LARGE,
  }
});

class SignUpStudentStep1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empty: false,
      error: false,
      email: ''
    };
  }

  componentDidMount() {

  }

  render() {
    const { temp } = this.props;
    const { email, empty, error } = this.state;

    return (
      <Container>
        <Content>
          <View style={{height: height - 24}}>
            <ScreenHeader
              backgroundColor="transparent"
              leftIcon="md-arrow-back"
              rightText="SIGN IN"
              onPressLeft={() => NavigationService.goBack()}
              onPressRight={() => NavigationService.navigate('SignIn')}
              textColor={theme.colors.white}
            />
            <Image source={Background} style={styles.image}/>
            <View style={styles.bottomView}>
              <View style={styles.description}>
                <Text style={styles.descriptionText}>
                  To become a 
                  <Text style={styles.stintText}> Stint Student </Text>
                  you must be a student at an official
                  <Text style={styles.stintText}> Stint University</Text>
                </Text>
              </View>
              {
                temp.signUpUser.university.name.length === 0 ?
                <TouchableOpacity onPress={() => NavigationService.navigate('SelectUniversity')}>
                  <View style={styles.selectButton}>
                    <Text style={styles.selectButtonText}>SELECT YOUR UNIVERSITY</Text>
                  </View>
                </TouchableOpacity>
                :
                <ValidationInput
                  value={email}
                  label="ENTER EMAIL"
                  error={error}
                  errorText="INVALID EMAIL ADDRESS"
                  onChange={(email) => this.setState({email})}
                  capitalize={false}>
                  <TouchableOpacity onPress={() => NavigationService.navigate('SelectUniversity')}>
                    <View style={styles.selectIconView}>
                      <Text style={styles.selectIconText}>@{temp.signUpUser.university.url}</Text>
                      <Icon name="md-arrow-dropdown" style={styles.selectIcon} />
                    </View>
                  </TouchableOpacity>
                </ValidationInput>
              }
              <ButtonWithIcon
                text="VERIFY MY STATUS"
                onPress={this.gotoStep2}
              />
            </View>
          </View>
        </Content>
      </Container>
    );
  }

  gotoStep2 = () => {
    const { email } = this.state;
    const { temp: {signUpUser: {university}} } = this.props;
    const fullEmail = email + '@' + university.url
    if(email.length === 0){
      this.setState({empty: true})
    } 
    else if(Operators.emailValidation(fullEmail)) {
      // goto Step2
      this.setState({empty: false, error: false})
      this.props.setSignUpUserEmail(fullEmail)
      NavigationService.navigate('Step2')
    } else {
      this.setState({error: true})
    }
  }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ActionCreators, dispatch);
  }
export default connect(state => ({
  temp: state.temp,
}), mapDispatchToProps)(SignUpStudentStep1);

