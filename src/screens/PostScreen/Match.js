

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
import { ActionCreators } from '../../redux/actions';
import NavigationService from '../../navigation/NavigationService';
import ScreenHeader from '../../components/Navigation/ScreenHeader';
import ButtonWithIcon from '../../components/Button/ButtonWithIcon';
import { dySize, getFontSize } from '../../utils/responsive';
import theme from '../../theme';

const Background = require('../../assets/images/post-summary/background-circle.png');
const PhotoIcon = require('../../assets/images/profile-photo/profile-photo.png');
const ClockIcon = require('../../assets/images/ui/clock-dark-small.png');
const LocationIcon = require('../../assets/images/ui/location-dark-small.png');
const NoteIcon = require('../../assets/images/ui/note-dark-small.png');
const StarIcon = require('../../assets/images/ui/star-yellow-large.png');
const GreyStarIcon = require('../../assets/images/ui/star-yellow-large.png');


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    resizeMode: 'cover'
  },
  buttomButton: {
    position: 'absolute',
    bottom: dySize(20),
    left: dySize(20),
    right: dySize(20)
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardView: {
    backgroundColor: theme.colors.white,
    padding: dySize(15),
    width: dySize(275),
  },
  avatar: {
    width: dySize(60),
    height: dySize(60),
    resizeMode: 'contain'
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerLeft: {
    justifyContent: 'center'
  },
  headerText: {
    fontSize: getFontSize(24),
    fontFamily: 'Montserrat-Medium',
  },
  cardContent: {
    flexDirection: 'row',
    paddingTop: dySize(15) 
  },
  infoView: {
    flex: 0.6
  },
  infoLine: {
    paddingVertical: dySize(5),
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    width: dySize(12),
    height: dySize(12),
    resizeMode: 'contain'
  },
  infoText: {
    fontSize: theme.FONT_SIZE_SMALL,
    fontFamily: 'Montserrat-Regular',
    paddingLeft: dySize(10)
  },
  starView: {
    flex: 0.4,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  starIcon: {
    width: dySize(16),
    height: dySize(16),
    resizeMode: 'contain'
  },
  bigText: {
    fontSize: getFontSize(24),
    fontFamily: 'Montserrat-Regular',
    paddingVertical: dySize(15),
    color: theme.colors.white
  },
  smallText: {
    fontSize: theme.FONT_SIZE_MEDIUM,
    fontFamily: 'Montserrat-Regular',
    color: theme.colors.white
  }
});

class MatchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {

  }

  render() {
    

    return (
      <View style={styles.container}>
        <Image source={Background} style={styles.background} />
        <View style={styles.content}>
          <View style={styles.cardView}>
            <View style={styles.cardHeader}>
              <View style={styles.headerLeft}>
                <Text style={styles.headerText}>Stint</Text>
                <Text style={styles.headerText}>Worker</Text>
              </View>
              <Image source={PhotoIcon} style={styles.avatar} />
            </View>
            <View style={styles.cardContent}>
              <View style={styles.infoView}>
                <View style={styles.infoLine}>
                  <Image source={LocationIcon} style={styles.icon} />
                  <Text style={styles.infoText}>Local</Text>
                </View>
                <View style={styles.infoLine}>
                  <Image source={NoteIcon} style={styles.icon} />
                  <Text style={styles.infoText}>Skilled</Text>
                </View>
                <View style={styles.infoLine}>
                  <Image source={ClockIcon} style={styles.icon} />
                  <Text style={styles.infoText}>Power by the hour</Text>
                </View>
              </View>
              <View style={styles.starView}>
                <Image source={StarIcon} style={styles.starIcon} />
                <Image source={StarIcon} style={styles.starIcon} />
                <Image source={StarIcon} style={styles.starIcon} />
                <Image source={StarIcon} style={styles.starIcon} />
                <Image source={GreyStarIcon} style={styles.starIcon} />
              </View>
            </View>
          </View>
          <Text style={styles.bigText}>GREAT! WE'RE ON IT!</Text>
          <Text style={styles.smallText}>Expect Stint Matches</Text>
          <Text style={styles.smallText}>very soon</Text>
        </View>
        <ButtonWithIcon
          style={styles.buttomButton}
          text="GOT IT!"
          onPress={this.onPressGotIt}
        />
      </View>
    );
  }

  onPressGotIt = () => {
    NavigationService.navigate('Home')
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(state => ({
  appState: state.appState,
}), mapDispatchToProps)(MatchScreen);


