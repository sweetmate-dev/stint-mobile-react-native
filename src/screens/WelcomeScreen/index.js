

/* jshint esversion: 6 *//* jshint node: true */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
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

const welcomeImage = require('../../assets/images/welcome-screen/first.png')

const styles = StyleSheet.create({
  image: {
    height: dySize(465),
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
  welcomeText: {
    fontSize: getFontSize(30),
    color: theme.colors.white,
    fontFamily: 'LibreBaskerville-Bold'
  },
});

class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <Container>
        <Image source={welcomeImage} style={styles.image}/>
        <View style={styles.bottomView}>
          <View style={styles.textView}>
          <Text style={styles.welcomeText}>Welcome to Stint</Text>
          </View>
          <ButtonWithIcon
            text="LET'S DO this"
            onPress={this.letsDoThis}
          />
        </View>
      </Container>
    );    
  }

  letsDoThis = () => {
    NavigationService.navigate('TodoThis');
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(state => ({
  appState: state.router.appState
}), mapDispatchToProps)(WelcomeScreen);