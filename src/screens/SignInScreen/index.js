

/* jshint esversion: 6 *//* jshint node: true */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../redux/actions';
import { Container, Content } from 'native-base';
import theme from '../../theme';
import NavigationService from '../../navigation/NavigationService';
import { getFontSize, dySize } from '../../utils/responsive';
import ValidationInput from '../../components/Input/ValidationInput';
import ScreenHeader from '../../components/Navigation/ScreenHeader';
import ButtonWithIcon from '../../components/Button/ButtonWithIcon';

const { height } = Dimensions.get('window');
const Background = require('../../assets/images/sign-in/box-background.png')

const styles = StyleSheet.create({
  image: {
    width: dySize(375),
    height: dySize(364),
    resizeMode: 'stretch',
    marginTop: -70,
    zIndex: -1
  },
  bottomView: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  textView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: getFontSize(30),
    color: theme.colors.white,
    fontFamily: 'LibreBaskerville-Bold'
  },
  
  inputView: {
    marginVertical: 5,
    width: dySize(345)
  },
  forgotText: {
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
    fontSize: theme.FONT_SIZE_SMALL,
    color: theme.colors.gray,
    padding: 10
  }
});

class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      empty: {
        email: false,
        password: false
      },
      error: {
        email: false,
        password: false
      }
    };
  }

  componentDidMount() {
    // this.props.welcome();
  }

  render() {
    const { email, password, empty, error} = this.state;
    return (
      <Container>
        <Content contentContainerStyle={{height: height - 24}}>        
          <ScreenHeader
            backgroundColor="transparent"
            title="SIGN IN"
            leftIcon="md-arrow-back"
            onPressLeft={() => NavigationService.goBack()}
            textColor={theme.colors.white}
          />
          <Image source={Background} style={styles.image}/>
          <View style={styles.bottomView}>
            <ValidationInput
              label='YOUR E-MAIL'
              isError={error.email}
              onChange={(email) => this.setState({email})}
              value={email}
              errorText='THE EMAIL ADDRESS IS INCORRECT'
              style={styles.inputView}
              capitalize={false}
            />
            <ValidationInput
              label='PASSWORD'
              isError={error.password}
              onChange={(password) => this.setState({password})}
              value={password}
              errorText='PASSWORD MUST BE OVER 6 IN LENGTH'
              style={styles.inputView}
              isSecure={true}
            />
            <ButtonWithIcon 
              text="SIGN IN"
              onPress={() => this.login()}
            />
            <TouchableOpacity onPress={() => NavigationService.navigate('ForgotPassword')}>
              <Text style={styles.forgotText}>FORGOT PASSWORD</Text>
            </TouchableOpacity>   
          </View>
        </Content>
      </Container>
    );    
  }

  login() {
    if(this.props.user.type === 'business') NavigationService.navigate('Business')
    else NavigationService.navigate('Student')
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(state => ({
  user: state.user,
}), mapDispatchToProps)(SignInScreen);