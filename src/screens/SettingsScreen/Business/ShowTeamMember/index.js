

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

const avatar = require('../../../../assets/images/welcome-screen/second.png');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#EEEEEE',
  },
  generalView: {
    height: dySize(40),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightgray
  },
  generalText: {
    fontSize: theme.FONT_SIZE_SMALL,
    fontFamily: 'Montserrat-Regular',
    letterSpacing: dySize(4)
  },
  memberView: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: dySize(15),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightgray,
    backgroundColor: theme.colors.white,
  },
  avatar: {
    width: dySize(30),
    height: dySize(30),
    resizeMode: 'contain',
    marginRight: dySize(8)
  },
  checkIcon: {
    fontSize: theme.FONT_SIZE_LARGE,
  },
  name: {
    fontSize: getFontSize(14),
    fontFamily: 'Montserrat-Regular',
    color: theme.colors.black,
    flex: 1,
  },
  bottomView: {
    padding: dySize(15),
    paddingBottom: dySize(50),
    backgroundColor: '#EEEEEE'
  },
  bottomText: {
    fontSize: theme.FONT_SIZE_SMALL,
    fontFamily: 'LibreBaskerville-Regular',
    color: theme.colors.gray
  }
});

class ShowTeamMemberScreen extends Component {
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
    const { user: { personal, team_members }} = this.props;
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
          title="TEAM"
          leftIcon="md-arrow-back"
          onPressLeft={() => NavigationService.goBack()}
          textColor={theme.colors.black}
          borderBottomWidth={1}
        />
        <BoxShadow setting={shadowOpt}>
          <SearchInput
            value={searchText}
            onChange={(text) => this.setState({searchText: text})}
            placeholder="SEARCH FOR A MEMBER"
          />
        </BoxShadow>
        <ScrollView style={styles.scrollView}>
          <View style={styles.generalView}>
            <Text style={styles.generalText}>OWNER</Text>
          </View>
          <View style={styles.memberView}>
            <Image source={avatar} style={styles.avatar} />
            <Text style={styles.name}>
            {String(personal.first_name + ' ' + personal.last_name + ' (YOU)').toUpperCase()}
            </Text>
          </View>
          <View style={styles.generalView}>
            <Text style={styles.generalText}>ADMIN</Text>
          </View>
          {
            team_members.map((member) => {
              if(member.name.toLowerCase().indexOf(searchText.toLowerCase()) < 0) return;
              return(
                <View key={member.username} style={styles.memberView}>
                  <Image source={avatar} style={styles.avatar} />
                  <Text style={styles.name}>{member.name}</Text>
                </View>
              )
            })
          }
        </ScrollView>
        <View style={styles.bottomView}>
          <Text style={styles.bottomText}>Here is a list of all your team members from your business.</Text>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(state => ({
  user: state.user,
}), mapDispatchToProps)(ShowTeamMemberScreen);


