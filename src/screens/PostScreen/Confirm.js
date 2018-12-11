

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
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../redux/actions';
import NavigationService from '../../navigation/NavigationService';
import ScreenHeader from '../../components/Navigation/ScreenHeader';
import SearchInput from '../../components/Input/SearchInput';
import ButtonWithIcon from '../../components/Button/ButtonWithIcon';
import { dySize, getFontSize } from '../../utils/responsive';
import theme from '../../theme';
import { Card, Icon } from 'native-base';

const ClockIcon = require('../../assets/images/ui/clock-dark-small.png');
const LogoImage = require('../../assets/images/profile-photo/business-logo.png')
const DotIcon = require('../../assets/images/ui/dots-square-dark.png');
const CalendarIcon = require('../../assets/images/ui/calendar-dark-small.png');
const LocationIcon = require('../../assets/images/ui/location-dark-small.png');
const DebitIcon = require('../../assets/images/ui/credit-card-dark-small.png');

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
    fontSize: theme.FONT_SIZE_MEDIUM,
    fontFamily: 'Montserrat-Regular',
  },
  icon: {
    width: dySize(16),
    height: dySize(16),
    resizeMode: 'contain',
    marginRight: dySize(10)
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
  }
});

class ConfirmPostScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      backOpacity: 1
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
    const { post: { post, selectedCard }} = this.props;

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
              <Text style={styles.cardHeaderText}>Check Out</Text>
              <Image source={LogoImage} style={styles.logoImage} />
            </View>
            <View style={styles.infoView}>            
              <View style={styles.infoLine}>
                <Image source={DotIcon} style={styles.icon} />
                <Text style={styles.infoLineText}>{post.title}</Text>
              </View>
              <View style={styles.infoLine}>
                <Image source={ClockIcon} style={styles.icon} />
                <Text style={styles.infoLineText}>{this.getTimeDuration(post)}</Text>
              </View>
              <View style={styles.infoLine}>
                <Image source={CalendarIcon} style={styles.icon} />
                <Text style={styles.infoLineText}>{this.getDateString(post)}</Text>
              </View>
              <View style={styles.infoLine}>
                <Image source={LocationIcon} style={styles.icon} />
                <Text style={styles.infoLineText}>{post.location}</Text>
              </View>
              <View style={[styles.infoLine, {marginTop: dySize(20)}]}>
                <Image source={DebitIcon} style={styles.icon} />
                <Text style={styles.infoLineText}>{selectedCard.name}</Text>
              </View>
            </View>
            <View style={styles.infoView}>
              <Text style={styles.breakdownText}>PAYMENT BREAKDOWN</Text>
              <View style={styles.breakdownView}>
                <Text style={styles.infoLineText}>Base Stint Fee</Text>
                <Text style={styles.infoLineText}>£0</Text>
              </View>
              <View style={styles.breakdownView}>
                <Text style={styles.infoLineText}>Surge Fee</Text>
                <Text style={styles.infoLineText}>£0</Text>
              </View>
              <View style={styles.breakdownView}>
                <Text style={styles.infoLineText}>VAT</Text>
                <Text style={styles.infoLineText}>£0</Text>
              </View>
            </View>
            <View style={styles.quantityView}>
              <Text style={styles.infoLineText}>Quantity</Text>
              <Text style={styles.infoLineText}>1</Text>
            </View>
            <View style={styles.infoView}>
              <View style={[styles.breakdownView, {paddingVertical: 0}]}>
                <Text style={styles.poundText}>TOTAL</Text>
                <Text style={styles.poundText}>£0</Text>
              </View>
            </View>
          </Card>
          <Text style={styles.notifyText}>
            Please be aware of our cancellation policy - a fee may be incurred if cancelled at short notice
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
            <Text style={styles.poundText}>£0 / <Text style={styles.bottomText}>STINT</Text></Text>
            <View style={styles.hourView}>
              <Image source={ClockIcon} style={styles.icon} />
              <Text style={styles.bottomText}> 1 hrs</Text>
            </View>
          </View>
          <ButtonWithIcon
            style={{flex: 1}}
            text="CONFIRM"
            onPress={this.onPressConfirm}
            icon={null}
          />
        </View>
      </View>
    );
  }

  getTimeDuration = (post) => {
    return Moment(post.startDate).format('HH:mm') + ' - ' + Moment(post.endDate).format('HH:mm');
  }

  getDateString = (post) => {
    return Moment(post.startDate).format('dddd, DD. MMMM');
  }

  gotoPostOptions = () => {
    NavigationService.navigate('PostOption')
  }

  gotoEditInstruction = () => {
    NavigationService.navigate('EditInstruction')
  }

  gotoDirectDebit = () => {
    NavigationService.navigate('DirectDebit')
  }

  onPressConfirm = () => {
    NavigationService.navigate('Match')
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(state => ({
  post: state.post,
}), mapDispatchToProps)(ConfirmPostScreen);


