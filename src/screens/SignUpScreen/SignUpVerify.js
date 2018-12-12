

/* jshint esversion: 6 *//* jshint node: true */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../redux/actions';
import { Container } from 'native-base';
import theme from '../../theme';
import NavigationService from '../../navigation/NavigationService';
import { getFontSize, dySize } from '../../utils/responsive';
import ButtonWithIcon from '../../components/Button/ButtonWithIcon';

const welcomeImage = require('../../assets/images/verification/congratulation-background.png')

const styles = StyleSheet.create({
  image: {
    height: dySize(451),
    width: dySize(375),
    resizeMode: 'contain'
  },
  bottomView: {
    flex: 1,
    padding: 15,
    backgroundColor: theme.colors.gray
  },
  textView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifyText: {
    fontSize: theme.FONT_SIZE_LARGE,
    color: theme.colors.black,
    fontFamily: 'LibreBaskerville-Regular'
  },
  resendButtonView: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  resendButtonText: {
    fontSize: theme.FONT_SIZE_SMALL,
    fontFamily: 'Montserrat-Regular',
    color: theme.colors.white,
    letterSpacing: dySize(2)
  }
});

class SignUpStudentVerify extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    // alert(JSON.stringify(this.props.temp.signUpUser))
  }

  render() {
    return (
      <Container>
        <Image source={welcomeImage} style={styles.image}/>
        <View style={styles.bottomView}>
          <View style={styles.textView}>
            <Text style={styles.verifyText}>Please verify your email address</Text>
          </View>
          <ButtonWithIcon
            text="LOG OUT"
            onPress={this.logOut}
          />
          <TouchableOpacity onPress={this.resendEmail}>
            <View style={styles.resendButtonView}>
              <Text style={styles.resendButtonText}>RESEND EMAIIL (CHECK YOUR SPAM)</Text>
            </View>            
          </TouchableOpacity>
        </View>
      </Container>
    );    
  }

  logOut = () => {
    NavigationService.navigate('Welcome');
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(state => ({
  temp: state.temp
}), mapDispatchToProps)(SignUpStudentVerify);