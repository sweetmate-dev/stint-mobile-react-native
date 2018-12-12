

/* jshint esversion: 6 *//* jshint node: true */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import VersionNumber from 'react-native-version-number';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../redux/actions';
import { Container, Icon } from 'native-base';
import theme from '../../theme';
import NavigationService from '../../navigation/NavigationService';
import { dySize } from '../../utils/responsive';
import { 
  BUSINESS_PROFILE_TYPE, 
  STUDENT_PROFILE_TYPE,
  DATA_SIDE_BAR
} from '../../constants';

const welcomeImage = require('../../assets/images/welcome-screen/first.png')

const styles = StyleSheet.create({
  image: {
    width: dySize(80),
    height: dySize(80),
    resizeMode: 'cover'
  },
  username: {
    paddingVertical: dySize(15),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightgray,
    fontSize: theme.FONT_SIZE_MEDIUM,
  },
  diviLine: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.lightgray,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightgray,
    marginBottom: dySize(40) 
  },
  text: {
    fontSize: theme.FONT_SIZE_MEDIUM,
    fontFamily: 'Montserrat-Medium',
    paddingVertical: dySize(10)
  },
  versionText: {
    paddingVertical: dySize(10),
    fontSize: theme.FONT_SIZE_SMALL,
    fontFamily: 'Montserrat-Medium',
    color: theme.colors.lightgray,
  },
  clickableItemView: {
    paddingVertical: dySize(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: theme.FONT_SIZE_SMALL,
    fontFamily: 'Montserrat-Regular',
    color: theme.colors.gray
  },
  icon: {
    fontSize: theme.FONT_SIZE_SMALL,
  },
});

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  onNavigate = (item) => {
    this.props.onNavigate()
    NavigationService.navigate(item.goto)
  }

  render() {
    const _this = this;
    const { user } = this.props;
    return (
      <Container style={{padding: 30}}>
        <Image source={welcomeImage} style={styles.image}/>
        <Text style={styles.username}>{user.username}</Text>
        <View style={styles.diviLine}>
          {
            !user.completedProfile &&
            <TouchableOpacity onPress={this.onPressComplete}>
              <View style={styles.clickableItemView}>
                <Text style={styles.itemText}>3 STEPS LEFT</Text>
                <Icon name="ios-arrow-forward" style={styles.icon} />
              </View>
            </TouchableOpacity>
          }
        </View>
        <View style={{flex: 1}}>        
        {
          DATA_SIDE_BAR.map(function(item) {
            if(user.type !== item.type && item.type !== 'both') return;
            return(
              <TouchableOpacity key={item.label} onPress={() => _this.onNavigate(item)}>
                <Text style={styles.text}>{item.label}</Text>
              </TouchableOpacity>
            )
          })
        }
        </View>
        <Text style={styles.versionText}>VERSION {VersionNumber.appVersion}</Text>
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
  user: state.user
}), mapDispatchToProps)(SideBar);