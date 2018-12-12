

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
import HTMLView from 'react-native-htmlview';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../../redux/actions';
import NavigationService from '../../../../navigation/NavigationService';
import ScreenHeader from '../../../../components/Navigation/ScreenHeader';
import SearchInput from '../../../../components/Input/SearchInput';
import { dySize } from '../../../../utils/responsive';
import theme from '../../../../theme';

const HTMLCSS = StyleSheet.create({
  h2: {
    color: theme.colors.black,
    fontSize: theme.FONT_SIZE_LARGE,
    fontFamily: 'LibreBaskerville-Bold'
  },
  p: {
    color: theme.colors.black,
    fontSize: theme.FONT_SIZE_SMALL,
    fontFamily: 'Montserrat-Regular',
    lineHeight: dySize(24)
  },
  div: {
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  a: {
    fontWeight: '300',
    color: '#FF3366', // make links coloured pink
  },
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
    padding: dySize(20),
    backgroundColor: theme.colors.white
  }
});

class PrivacyAndPolicyScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    this.props.loadTermsAndConditions()
  }

  render() {
    

    return (
      <View style={styles.container}>
        <ScreenHeader
          backgroundColor={theme.colors.white}
          title="PRIVACY POLICY"
          leftIcon="md-arrow-back"
          onPressLeft={() => NavigationService.goBack()}
          textColor={theme.colors.black}
          borderBottomWidth={1}
        />
        <ScrollView style={styles.scrollView}>
          <HTMLView
            value={this.props.TAC}
            stylesheet={HTMLCSS}
            style={{ paddingBottom: 100 }}
          />
        </ScrollView>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(state => ({
  TAC: state.temp.termsHTML,
}), mapDispatchToProps)(PrivacyAndPolicyScreen);


