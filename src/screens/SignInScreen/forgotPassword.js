

/* jshint esversion: 6 *//* jshint node: true */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../redux/actions';
import { Container, Content } from 'native-base';
import theme from '../../theme';
import NavigationService from '../../navigation/NavigationService';
import { getFontSize, dySize } from '../../utils/responsive';
import ValidationInput from '../../components/Input/ValidationInput';
import ButtonWithIcon from '../../components/Button/ButtonWithIcon';
import ScreenHeader from '../../components/Navigation/ScreenHeader';

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
  descriptionText: {
    textAlign: 'center',
    fontFamily: 'LibreBaskerville-Regular',
    fontSize: theme.FONT_SIZE_LARGE,
    color: theme.colors.gray,
    padding: 10
  },
  description: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class ForgotPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      empty: false,
      error: false
    };
  }

  componentDidMount() {
    // this.props.welcome();
  }

  render() {
    const { email, empty, error} = this.state;
    return (
      <Container>        
        <Content>
          <ScreenHeader
            backgroundColor="transparent"
            title="FORGOT PASSWORD"
            leftIcon="md-arrow-back"
            onPressLeft={() => NavigationService.goBack()}
            textColor={theme.colors.white}
          />
          <Image source={Background} style={styles.image}/>
          <View style={styles.bottomView}>
            <View style={styles.description}>
              <Text style={styles.descriptionText}>
                Enter your e-mail address and we'll send you a link to reset your password
              </Text>
            </View> 
            <ValidationInput
              label='YOUR E-MAIL'
              isError={error.email}
              onChange={(email) => this.setState({email})}
              value={email}
              errorText='THE EMAIL ADDRESS IS INCORRECT'
              style={styles.inputView}
            />
            <ButtonWithIcon
              text="SEND"
              onPress={this.onSubmit}
            />
          </View>
        </Content>
      </Container>
    );    
  }

  onSubmit = () => {
    alert('comming soon')
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(state => ({
  appState: state.router.appState
}), mapDispatchToProps)(ForgotPasswordScreen);