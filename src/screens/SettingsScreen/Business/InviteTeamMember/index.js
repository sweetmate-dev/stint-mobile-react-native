

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
import SearchInput from '../../../../components/Input/SearchInput';
import ButtonWithIcon from '../../../../components/Button/ButtonWithIcon';
import ValidationInput from '../../../../components/Input/ValidationInput';
import { dySize } from '../../../../utils/responsive';
import theme from '../../../../theme';
import * as Operators from '../../../../utils/operators';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  sectionView: {
    backgroundColor: '#EEEEEE',
    padding: dySize(10),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightgray,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sectionText: {    
    fontSize: theme.FONT_SIZE_SMALL,
    fontFamily: 'Montserrat-Regular',
    letterSpacing: dySize(4)  
  },
  inputView: {
    padding: dySize(15)
  },
  bottomTextView: {
    padding: dySize(15),
    backgroundColor: '#EEEEEE',
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: theme.colors.lightgray,
  },
  bottomText: {
    color: theme.colors.gray,
    fontSize: theme.FONT_SIZE_SMALL,
    fontFamily: 'LibreBaskerville-Regular'
  },
});

class InviteTeamMemberScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      email: '',
    };
  }

  componentDidMount() {

  }

  onPressInvite = () => {
    if(!Operators.emailValidation(this.state.email)) {
      this.setState({error: true})
    } else {
      this.setState({error: false});
      // invite function here
      NavigationService.goBack()
    }
  }

  render() {    
    const {error, email} = this.state;
    return (
      <View style={styles.container}>
        <ScreenHeader
          backgroundColor={theme.colors.white}
          title="INVITE A TEAM MEMBER"
          leftIcon="md-close"
          onPressLeft={() => NavigationService.goBack()}
          textColor={theme.colors.black}
          borderBottomWidth={1}
        />
        <View style={styles.sectionView}>
          <Text style={styles.sectionText}>VIA EMAIL ADDRESS</Text>
        </View>
        <View style={styles.inputView}>
          <ValidationInput
            label="ENTER AN EMAIL ADDRESS TO INVITE"
            value={email}
            onChange={(email) => this.setState({email})}
            isError={error}
            errorText="THE EMAIL ADDRESS IS INCORRECT"
          />
        </View>
        <View style={styles.bottomTextView}>
          <Text style={styles.bottomText}>Enter a valid email address to invite a team member to your business account.</Text>
        </View>
        {
          email.length > 0 &&
          <ButtonWithIcon
            text="INVITE USER"
            onPress={this.onPressInvite}
            style={{height: dySize(50)}}
          />
        }
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(state => ({
  appState: state.appState,
}), mapDispatchToProps)(InviteTeamMemberScreen);


