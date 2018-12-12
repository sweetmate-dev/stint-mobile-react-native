

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
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../../redux/actions';
import NavigationService from '../../../../navigation/NavigationService';
import ScreenHeader from '../../../../components/Navigation/ScreenHeader';
import ValidationInput from '../../../../components/Input/ValidationInput';
import ButtonWithIcon from '../../../../components/Button/ButtonWithIcon';
import SearchInput from '../../../../components/Input/SearchInput';
import { dySize } from '../../../../utils/responsive';
import theme from '../../../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topView: {
    paddingHorizontal: dySize(15),
    paddingVertical: dySize(30)
  },
  inputView: {
    marginVertical: 5,
    width: dySize(345)
  },
  bottomView: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    padding: dySize(15),
    borderTopWidth: 1,
    borderTopColor: theme.colors.lightgray,
    justifyContent: 'space-between'
  },
  bottomText: {
    fontSize: theme.FONT_SIZE_SMALL,
    fontFamily: 'LibreBaskerville-Regular',
    color: theme.colors.gray,
    lineHeight: dySize(22),
    marginBottom: dySize(30)
  },
});

class CompleteMobileNumberScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: '',
      error: false
    };
  }

  componentDidMount() {

  }

  onPressNext = () => {
    //Add mobile number function here
    this.props.updateCompleteProfileState({ mobile: true })
  }

  render() {
    
    const { error, number } = this.state;
    return (
      <View style={styles.container}>
        <ScreenHeader
          backgroundColor={theme.colors.white}
          title="MOBILE NUMBER"
          leftIcon="md-arrow-back"
          onPressLeft={() => NavigationService.goBack()}
          textColor={theme.colors.black}
          borderBottomWidth={1}
        />
        <View style={styles.topView}>
          <ValidationInput
            label='MOBILE PHONE NUMBER'
            isError={error}
            onChange={(number) => this.setState({number})}
            value={number}
            errorText='PLEASE SPECIFY A VALID PHONE NUMBER'
            style={styles.inputView}
            maxLength={13}
            keyboardType="phone-pad"
          />
        </View>
        <View style={styles.bottomView}>
          <Text style={styles.bottomText}>We need a profile photo of you that clearly shows your face and doesn't include any personal and sensitive information.</Text>
          <ButtonWithIcon
            text="NEXT"
            onPress={this.onPressNext}
          />
        </View>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(state => ({
  appState: state.appState,
}), mapDispatchToProps)(CompleteMobileNumberScreen);


