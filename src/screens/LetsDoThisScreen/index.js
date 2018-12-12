

/* jshint esversion: 6 *//* jshint node: true */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container } from 'native-base';
import { ActionCreators } from '../../redux/actions';
import theme from '../../theme';
import { dySize } from '../../utils/responsive';
import ScreenHeader from '../../components/Navigation/ScreenHeader';
import ButtonWithIcon from '../../components/Button/ButtonWithIcon';
import NavigationService from '../../navigation/NavigationService';

const TopImage = require('../../assets/images/welcome-screen/choice-screen.jpg')

const styles = StyleSheet.create({
  image: {
    width: dySize(375),
    height: dySize(249),
    resizeMode: 'stretch',
    marginTop: -70,
    zIndex: -1
  },
  bottomView: {
    flex: 1
  },
  workView: {
    flex: 1,
    padding: 15,
  },
  hireView: {
    flex: 1,
    padding: 15,
    backgroundColor: theme.colors.lightgray
  },
  choiceDescriptionView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  choiceDescriptionText: {
    color: theme.colors.black,
    fontSize: theme.FONT_SIZE_LARGE,
    fontFamily: 'LibreBaskerville-Regular',
    textAlign: 'center'
  },
  stintText: {
    color: theme.colors.black,
    fontSize: theme.FONT_SIZE_LARGE,
    fontFamily: 'LibreBaskerville-Italic',
    textAlign: 'center'
  },
});

class LetsDoThisScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }
  
  componentDidMount() {

  }

  render() {
    return (
      <Container>
        <ScreenHeader
          backgroundColor="transparent"
          title="LET'S DO this"
          leftIcon="md-arrow-back"
          rightText="SIGN IN"
          onPressLeft={() => NavigationService.goBack()}
          onPressRight={() => NavigationService.navigate('SignIn')}
        />
        <Image source={TopImage} style={styles.image} />        
        <View style={styles.bottomView}>
          <View style={styles.workView}>
            <View style={styles.choiceDescriptionView}>
              <Text style={styles.choiceDescriptionText}>
              I'm a university student and want to become a 
              <Text style={styles.stintText}> Stint Student</Text>
              </Text>
            </View>
            <ButtonWithIcon
              text="GET WORK"
              onPress={this.signUpAsStudent}
            />
          </View>
          <View style={styles.hireView}>
            <View style={styles.choiceDescriptionView}>
              <Text style={styles.choiceDescriptionText}>
                I would like to hire
              </Text>
              <Text style={styles.stintText}>
                Stint Student
              </Text>
            </View>
            <ButtonWithIcon
              text="GET WORK DONE"
              onPress={this.signUpAsBusiness}
            />
          </View>
        </View>
      </Container>
    );
  }

  signUpAsStudent = () => {
    NavigationService.navigate('SignUpStudent')
  }

  signUpAsBusiness = () => {
    NavigationService.navigate('SignUpBusiness')
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(state => ({
  appState: state.router.appState
}), mapDispatchToProps)(LetsDoThisScreen);