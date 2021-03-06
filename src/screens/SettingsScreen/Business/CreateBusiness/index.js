

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
import { Container } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../../redux/actions';
import NavigationService from '../../../../navigation/NavigationService';
import ButtonWithIcon from '../../../../components/Button/ButtonWithIcon';
import { dySize, getFontSize } from '../../../../utils/responsive';
import theme from '../../../../theme';

const welcomeImage = require('../../../../assets/images/cover/cover-background.png')

const styles = StyleSheet.create({
  image: {
    height: dySize(453),
    width: dySize(375),
    resizeMode: 'contain'
  },
  bottomView: {
    flex: 1,
    padding: 15,
    backgroundColor: theme.colors.lightgray
  },
  textView: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: dySize(15)
  },
  welcomeText: {
    fontSize: getFontSize(24),
    fontFamily: 'LibreBaskerville-Regular',
    textAlign: 'center'
  },
  ItalicText: {
    fontSize: getFontSize(24),
    fontFamily: 'LibreBaskerville-Italic',
  },
  thankText: {
    fontSize: theme.FONT_SIZE_SMALL,
    fontFamily: 'Montserrat-Regular',
    marginBottom: dySize(10)
  }
});

class CreateBusinessWelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {

  }

  onNext = () => {
    NavigationService.navigate('CreateBusinessStep')
  }

  getIncompletedSteps = () => {
    const { user: { hasBusiness } } = this.props;
    let num = 0;
    if(!hasBusiness.logo) num++;
    if(!hasBusiness.detail) num++;
    if(!hasBusiness.payment) num++;
    return num
  }

  render() {
    

    return (
      <Container>
        <Image source={welcomeImage} style={styles.image}/>
        <View style={styles.bottomView}>
          <View style={styles.textView}>
            <Text style={styles.thankText}>START HIRING</Text>
            <Text style={styles.welcomeText}>
            {'Only ' + this.getIncompletedSteps() + ' step away from '}
            <Text style={styles.ItalicText}>hiring </Text>
            your first
            <Text style={styles.ItalicText}> Stint Student </Text>
            for your
            <Text style={styles.ItalicText}> Business</Text>
            </Text>
          </View>
          <ButtonWithIcon
            text="COMPLETE PROFILE"
            onPress={this.onNext}
          />
        </View>
      </Container>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(state => ({
  user: state.user,
}), mapDispatchToProps)(CreateBusinessWelcomeScreen);


