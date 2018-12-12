

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
import Moment from 'moment';
import MapView from 'react-native-maps';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../../redux/actions';
import NavigationService from '../../../../navigation/NavigationService';
import ScreenHeader from '../../../../components/Navigation/ScreenHeader';
import ButtonWithIcon from '../../../../components/Button/ButtonWithIcon';
import { dySize, getFontSize } from '../../../../utils/responsive';
import theme from '../../../../theme';
import { Card, Icon } from 'native-base';

const ClockIcon = require('../../../../assets/images/ui/clock-dark-small.png');
const LogoImage = require('../../../../assets/images/profile-photo/business-logo.png')
const DressIcon = require('../../../../assets/images/ui/dress-code-dark-small.png');
const CalendarIcon = require('../../../../assets/images/ui/calendar-dark-small.png');
const NoteIcon = require('../../../../assets/images/post-summary/notes-grey-xsmall.png');
const PersonIcon = require('../../../../assets/images/profile-photo/profile-photo.png');


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
  },
  backLogoView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: dySize(280),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.black
  },
  backLogoText: {
    color: theme.colors.white,
    fontSize: getFontSize(50),
    letterSpacing: dySize(10),
    fontWeight: 'bold'
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: dySize(60)
  },
  scrollView: {
    backgroundColor: 'transparent',
    paddingTop: dySize(160),
    paddingHorizontal: dySize(15)
  },
  confirmView: {
    height: dySize(80),
    padding: dySize(15),
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: theme.colors.lightgray,
    backgroundColor: theme.colors.white
  },
  confirmPriceView: {
    flex: 1,
    justifyContent: 'center'
  },
  poundText: {
    fontSize: theme.FONT_SIZE_MEDIUM,
    fontFamily: 'Montserrat-Medium'
  },
  bottomText: {
    fontSize: theme.FONT_SIZE_SMALL,
    fontFamily: 'Montserrat-Regular'
  },
  cardHeader: {
    height: dySize(60),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',    
  },
  cardHeaderText: {
    fontSize: theme.FONT_SIZE_LARGE,
    color: theme.colors.black,
    fontWeight: 'bold'
  },
  logoImage: {
    width: dySize(40),
    height: dySize(40),
    resizeMode: 'contain',
  },
  infoView: {
    paddingVertical: dySize(20),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightgray
  },
  infoLine: {
    marginVertical: dySize(5),    
    flexDirection: 'row',
    alignItems: 'center'
  },
  infoLineText: {
    fontSize: getFontSize(14),
    fontFamily: 'Montserrat-Regular',
  },
  icon: {
    width: dySize(16),
    height: dySize(16),
    resizeMode: 'contain',
    marginRight: dySize(10)
  },
  debitLine: {
    height: dySize(60),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightgray,
    marginBottom: dySize(30)
  },
  notifyText: {
    fontSize: theme.FONT_SIZE_SMALL,
    fontFamily: 'LibreBaskerville-Regular',
    color: theme.colors.gray,
    lineHeight: dySize(20),
    marginVertical: dySize(15)
  },
  hourView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  breakdownView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: dySize(5)
  },
  quantityView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: dySize(5),
    borderBottomColor: theme.colors.lightgray,
    borderBottomWidth: 1
  },
  breakdownText: {
    fontSize: theme.FONT_SIZE_SMALL,
    fontFamily: 'Montserrat-Medium',
    marginBottom: dySize(20)
  },
  cardView: {
    padding: dySize(15),
    paddingBottom: dySize(30)
  },
  buttonLine: {
    height: dySize(60),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightgray
  },
  buttonLineText: {
    fontSize: theme.FONT_SIZE_MEDIUM,
    fontFamily: 'Montserrat-Regular',
  },
  buttonLineIcon: {
    fontSize: theme.FONT_SIZE_MEDIUM,
  },
  sectionTitle: {
    fontSize: theme.FONT_SIZE_SMALL,
    fontFamily: 'Montserrat-Medium',
    marginVertical: dySize(10)
  },
  mapView: {
    flex: 1,
    height: dySize(200),
    marginBottom: dySize(70)
  },
  mapMarker: {
    fontSize: theme.FONT_SIZE_MEDIUM
  }
});

class MyStintScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backOpacity: 1,
      stint: this.props.navigation.state.params.stint
    };
  }

  componentDidMount() {

  }

  onScroll(nativeEvent) {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;    
    const maxScrollHeight = contentSize.height - layoutMeasurement.height;
    const currentRestHeight = layoutMeasurement.height + contentOffset.y - contentSize.height;
    console.log(maxScrollHeight + ', ' + currentRestHeight);
    this.setState({backOpacity: currentRestHeight / maxScrollHeight * (-1)})
  }

  render() {
    const { stint } = this.state;

    return (
      <View style={styles.container}>
        <View style={[styles.backLogoView, {opacity: this.state.backOpacity}]}>
          <Text style={styles.backLogoText}>STINT</Text>
        </View>             
        <ScrollView
          contentContainerStyle={styles.scrollView}
          onScroll={({ nativeEvent }) => this.onScroll(nativeEvent)}
          scrollEventThrottle={50}
        >
          <Card style={styles.cardView}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardHeaderText}>{stint.title}</Text>
              <Image source={LogoImage} style={styles.logoImage} />
            </View>
            <View style={styles.infoView}>            
              <View style={styles.infoLine}>
                <Text style={styles.infoLineText}>{stint.location}</Text>
              </View>
              <View style={styles.infoLine}>
                <Image source={ClockIcon} style={styles.icon} />
                <Text style={styles.infoLineText}>{stint.from + ' - ' + stint.to}</Text>
              </View>
              <View style={styles.infoLine}>
                <Image source={CalendarIcon} style={styles.icon} />
                <Text style={styles.infoLineText}>{this.getDateString(stint.date)}</Text>
              </View>
              <View style={styles.infoLine}>
                <Text style={styles.sectionTitle}>GUIDE</Text>
              </View>
              <View style={styles.infoLine}>
                <Image source={DressIcon} style={styles.icon} />
                <Text style={styles.infoLineText}>{stint.instruction}</Text>
              </View>
              <View style={styles.infoLine}>
                <Image source={NoteIcon} style={styles.icon} />
                <Text style={styles.infoLineText}>{stint.uniform}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={this.gotoEditGuide}>
              <View style={styles.buttonLine}>
                <Text style={styles.buttonLineText}>EDIT GUIDE</Text>
                <Icon name="ios-arrow-forward" style={styles.buttonLineIcon} />
              </View>
            </TouchableOpacity>
            <View style={styles.infoLine}>
              <Text style={styles.sectionTitle}>CONTACT PERSON</Text>
            </View>
            <View style={styles.infoLine}>
              <Image source={PersonIcon} style={[styles.logoImage, {marginRight: dySize(10)}]} />
              <Text style={styles.infoLineText}>{this.props.user.personal.first_name}</Text>
            </View>
            <View>
              <Text style={styles.sectionTitle}>LOCATION</Text>
              <MapView
                style={styles.mapView}
                showsMyLocationButton
                loadingEnabled
                initialRegion={{
                  latitude: 51.506291,
                  longitude: -0.106090,
                  latitudeDelta: 0.0022,
                  longitudeDelta: 0.0021,
                }}
                scrollEnabled={false}
                zoomEnabled={false}
              >
                <MapView.Marker
                  coordinate={{
                    latitude: 51.506291,
                    longitude: -0.106090,
                  }}
                  title="Location"
                  description={stint.location}
                >
                  <View>
                    <Icon name="md-radio-button-off" style={styles.mapMarker} />
                  </View>
                </MapView.Marker>
              </MapView>
            </View>
          </Card>
          <Text style={styles.notifyText}>
            You can find all relevant information about your next Stint here.
          </Text>
        </ScrollView>
        <LinearGradient
          style={styles.header}
          colors={['transparent', theme.colors.black]}
          start={{ x: 0.0, y: 1 }}
          end={{ x: 0.0, y: 0 }}
        >
          <ScreenHeader
            backgroundColor="transparent"
            title=""
            leftIcon="md-arrow-back"
            onPressLeft={() => NavigationService.goBack()}
            textColor={theme.colors.white}
          />
        </LinearGradient>
        <View style={styles.confirmView}>
          <View style={styles.confirmPriceView}>
            <Text style={styles.poundText}>18:00 / <Text style={styles.bottomText}>TIME</Text></Text>
            <View style={styles.hourView}>
              <Image source={ClockIcon} style={styles.icon} />
              <Text style={styles.bottomText}> {this.getDateString(stint.date)}</Text>
            </View>
          </View>
          <ButtonWithIcon
            style={{flex: 1}}
            text="CANCEL"
            onPress={this.onPressCancel}
            icon={null}
          />
        </View>
      </View>
    );
  }

  getDateString = (date) => {
    return Moment(date).format('dddd, DD. MMMM');
  }

  gotoEditGuide = () => {
    NavigationService.navigate('MyStintGuide')
  }

  onPressCancel = () => {

  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(state => ({
  user: state.user,
}), mapDispatchToProps)(MyStintScreen);


