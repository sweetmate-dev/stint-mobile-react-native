

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

const welcomeImage = require('../../../../assets/images/verification/congratulation-background.png')

const styles = StyleSheet.create({
  image: {
    height: dySize(451),
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
  },
  welcomeText: {
    fontSize: getFontSize(24),
    color: theme.colors.gray,
    fontFamily: 'LibreBaskerville-Regular',
    textAlign: 'center'
  },
  thankText: {
    fontSize: theme.FONT_SIZE_SMALL,
    fontFamily: 'Montserrat-Regular',
    marginBottom: dySize(10)
  }
});

class CompletedProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {

  }

  onStartHiring = () => {
    NavigationService.navigate('Home')
  }

  render() {
    

    return (
      <Container>
        <Image source={welcomeImage} style={styles.image}/>
        <View style={styles.bottomView}>
          <View style={styles.textView}>
            <Text style={styles.thankText}>THANK YOU!</Text>
            <Text style={styles.welcomeText}>You're all set to hire your first Stint Student!</Text>
          </View>
          <ButtonWithIcon
            text="START HIRING"
            onPress={this.onStartHiring}
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
}), mapDispatchToProps)(CompletedProfileScreen);


