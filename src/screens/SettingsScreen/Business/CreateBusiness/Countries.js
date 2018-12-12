

/* jshint esversion: 6 *//* jshint node: true */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import { BoxShadow } from 'react-native-shadow'
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../../redux/actions';
import NavigationService from '../../../../navigation/NavigationService';
import ScreenHeader from '../../../../components/Navigation/ScreenHeader';
import SearchInput from '../../../../components/Input/SearchInput';
import { dySize, getFontSize } from '../../../../utils/responsive';
import { EUROPE_COUNTRIES } from '../../../../constants';
import theme from '../../../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  generalView: {
    height: dySize(40),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
  },
  generalText: {
    fontSize: theme.FONT_SIZE_SMALL,
    fontFamily: 'Montserrat-Regular',
  },
  pickerView: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: dySize(15),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightgray
  },
  flag: {
    width: dySize(30),
    height: dySize(20),
    resizeMode: 'contain',
    marginRight: dySize(8)
  },
  checkIcon: {
    fontSize: theme.FONT_SIZE_LARGE,
  },
  country: {
    fontSize: getFontSize(14),
    fontFamily: 'Montserrat-Regular',
    color: theme.colors.black,
    flex: 1,
  },
});

class SelectCountryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
  }

  componentDidMount() {
  }

  onSelectCountry = (countryCode) => {
    this.props.setBusinessCountry(countryCode);
  }

  render() {
    const { searchText } = this.state;
    const { user: { country }} = this.props;
    const shadowOpt = {
      width: dySize(375),
      height: dySize(62),
      color: theme.colors.darkgray,
      border: 2,
      radius: 4,
      opacity: 0.5,
      x:0,
      y:2,
    }
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <ScreenHeader
          backgroundColor={theme.colors.white}
          title="SELECT A COUNTRY"
          leftIcon="md-close"
          onPressLeft={() => NavigationService.goBack()}
          textColor={theme.colors.black}
          borderBottomWidth={1}
        />
        <BoxShadow setting={shadowOpt}>
          <SearchInput
            value={searchText}
            onChange={(text) => this.setState({searchText: text})}
            placeholder="SEARCH FOR A COUNTRY"
          />
        </BoxShadow>
        <ScrollView style={{flex: 1}}>
          <View style={styles.generalView}>
            <Text style={styles.generalText}>CURRENT LOCATION</Text>
          </View>
          <View style={styles.pickerView}>
            <Image source={EUROPE_COUNTRIES[country]['flag']} style={styles.flag} />
            <Text style={styles.country}>{EUROPE_COUNTRIES[country]['name']}</Text>
            <Icon name="ios-checkmark" style={styles.checkIcon} />
          </View>
          <View style={styles.generalView}>
            <Text style={styles.generalText}>LOCATIONS</Text>
          </View>
          {
            Object.keys(EUROPE_COUNTRIES).map((key) => {
              if(EUROPE_COUNTRIES[key].name.toLowerCase().indexOf(searchText.toLowerCase()) < 0) return;
              return(
                <TouchableOpacity onPress={() => this.onSelectCountry(key)}>
                  <View key={key} style={styles.pickerView}>
                    <Image source={EUROPE_COUNTRIES[key]['flag']} style={styles.flag} />
                    <Text style={styles.country}>{EUROPE_COUNTRIES[key]['name']}</Text>
                    {country === key && <Icon name="ios-checkmark" style={styles.checkIcon} />}
                  </View>
                </TouchableOpacity>
              )
            })
          }
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(state => ({
  user: state.user,
}), mapDispatchToProps)(SelectCountryScreen);


