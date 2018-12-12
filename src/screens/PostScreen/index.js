

/* jshint esversion: 6 *//* jshint node: true */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
  ScrollView
} from 'react-native';
import Moment from 'moment';
import dismissKeyboard from 'react-native-dismiss-keyboard';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../redux/actions';
import ScreenHeader from '../../components/Navigation/ScreenHeader';
import ButtonWithIcon from '../../components/Button/ButtonWithIcon';
import { dySize } from '../../utils/responsive';
import theme from '../../theme';
import { STINT_TYPE, POST_LOCATION } from '../../constants';
import NavigationService from '../../navigation/NavigationService';

const StintIcon = require('../../assets/images/ui/dots-square-dark.png');
const LocationIcon = require('../../assets/images/ui/location-dark-small.png');
const CalendarIcon = require('../../assets/images/ui/calendar-dark-small.png');
const DocIcon = require('../../assets/images/ui/document-dark-small.png');
const CloseIcon = require('../../assets/images/ui/clear-circle-dark-small.png');
const ClockIcon = require('../../assets/images/ui/clock-dark-small.png');


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  inputLine: {
    flexDirection: 'row',
    paddingHorizontal: dySize(15),
  },
  icon: {
    marginTop: dySize(17),
    width: dySize(15),
    height: dySize(15),
    resizeMode: 'contain',
  },
  inputView: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightgray,
    position: 'relative',
    paddingRight: 30,
    marginLeft: 20
  },
  input: {
    height: dySize(50),
    justifyContent: 'center',
    fontSize: theme.FONT_SIZE_MEDIUM,
    fontFamily: 'Montserrat-Regular'
  },
  closeIconView: {
    position: 'absolute',
    right: 0,
    top: 18,
    bottom: 18,
    width: dySize(14),
    height: dySize(14),
  },
  closeIcon: {    
    width: dySize(14),
    height: dySize(14),
    resizeMode: 'contain'
  },
  redText: {
    fontSize: theme.FONT_SIZE_SMALL,
    fontFamily: 'Montserrat-Regular',
    color: theme.colors.red
  },
  dateLine: {
    flexDirection: 'row',
    paddingHorizontal: dySize(15),    
  },
  dateView: {
    flex: 1,
    height: dySize(50),
    justifyContent: 'center',
    marginLeft: dySize(20),    
  },
  dateTextView: {
    flex: 1,
    justifyContent: 'center'
  },
  dateText: {
    fontSize: theme.FONT_SIZE_MEDIUM,
    fontFamily: 'Montserrat-Regular'
  },
  shadowLine: {
    shadowColor: theme.colors.lightgray,
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    borderWidth: 1,
    elevation: dySize(3)
  },
  titleItemView: {
    height: dySize(50),
    padding: dySize(15),
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightgray
  },
  titleItemText: {
    flex: 1,
    color: theme.colors.black,
    fontSize: theme.FONT_SIZE_MEDIUM,
    fontFamily: 'Montserrat-Regular',
    alignItems: 'center'
  },
  docIcon: {
    width: dySize(15),
    height: dySize(15),
    resizeMode: 'contain',
    marginRight: dySize(15)
  },
  arrowIcon: {
    fontSize: theme.FONT_SIZE_MEDIUM
  },
  dateTitleView: {
    height: dySize(50),
    paddingHorizontal: dySize(15),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: theme.colors.lightgray,
    borderBottomWidth: 1,
  },
  needSomeBodyText: {
    fontSize: theme.FONT_SIZE_SMALL,
    fontFamily: 'Montserrat-Regular',
  },
  dateButtonView: {
    height: dySize(50),
    flexDirection: 'row'
  },
  dateButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1
  },
  datePickerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonView: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.lightgray,
    padding: dySize(15),
  },
  datePickerText: {
    fontSize: theme.FONT_SIZE_LARGE,
    fontFamily: 'Montserrat-Regular',
  }
});

class PostScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      location: '',
      date: 'When Do You Need It?',
      startDate: null,
      endDate: null,
      locationValid: false,
      dateToggle: 'start',
      isDateTimePickerVisible: false,
    };
  }

  componentDidMount() {
    this.props.welcome();
  }

  checkValidLocation = () => {
    if(this.state.location.length === 0){
      this.setState({locationValid: false})
    } else {
      this.setState({locationValid: true})
    }
  }

  onNeedNow = () => {
    //
  }

  onPressStartDate = () => {
    this.setState({dateToggle: 'start'});
  }

  onPressEndDate = () => {
    this.setState({dateToggle: 'end'})
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
 
  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
 
  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    if(this.state.dateToggle === 'start') {
      this.setState({
        startDate: date, 
        endDate: new Date(date.getTime() + 3600000)
      })
    } else {
      this.setState({endDate: date})
    }
    this._hideDateTimePicker();
  };

  dateToString(T) {
    return Moment(T).format('MM/DD/YY HH:mm:00')
  }

  render() {
    const { 
      title, 
      location, 
      date, 
      dateToggle, 
      focusTo, 
      locationValid,
      startDate,
      endDate,
      isDateTimePickerVisible
    } = this.state;

    const canGoNext = (title.length > 0 && locationValid);

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <ScreenHeader
          backgroundColor={theme.colors.white}
          title="POST STINT"
          leftIcon="md-close"
          onPressLeft={() => NavigationService.goBack()}
          textColor={theme.colors.black}
        />
        <View style={styles.inputLine}>
          <Image source={StintIcon} style={styles.icon} />
          <View style={styles.inputView}>
            <TextInput
              placeholderTextColor={theme.colors.gray}
              placeholder="What Do You Need?"
              underlineColorAndroid='transparent'
              style={styles.input}
              onChangeText={(title) => this.setState({title})}
              value={title}
              onFocus={() => this.setState({focusTo: 'title'})}
              maxLength={40}
            />
            {
              focusTo === 'title' && title.length > 0 && 
              <TouchableOpacity style={styles.closeIconView} onPress={() => this.setState({title: ''})}>
                <Image source={CloseIcon} style={styles.closeIcon} />
              </TouchableOpacity>              
            }
          </View>          
        </View>
        <View style={styles.inputLine}>
          <Image source={LocationIcon} style={styles.icon} />
          <View style={styles.inputView}>
            <TextInput
              ref={(ref) => this.locationRef = ref}
              placeholderTextColor={theme.colors.gray}
              placeholder="Where Do You Need It?"
              underlineColorAndroid='transparent'
              style={styles.input}
              onChangeText={(location) => this.setState({location})}
              value={location}
              onFocus={() => this.setState({focusTo: 'location'})}
              onBlur={this.checkValidLocation}
              maxLength={40}
            />
            {
              focusTo === 'location' && location.length > 0 && 
              <TouchableOpacity style={styles.closeIconView} onPress={() => this.setState({location: ''})}>
                <Image source={CloseIcon} style={styles.closeIcon} />
              </TouchableOpacity>              
            }
            {
              !locationValid &&
              <Text style={styles.redText}>THIS FIELD IS REQUIRED, EG: 26 WEST RD, W12 9HL</Text>
            }
          </View>         
        </View>
        <View style={styles.dateLine}>
          <Image source={CalendarIcon} style={styles.icon} />
          <TouchableOpacity style={styles.dateView} onPress={this.onSelectDate}>
            <View style={styles.dateTextView}><Text style={styles.dateText}>{date}</Text></View>
          </TouchableOpacity>
        </View>
        <View style={styles.shadowLine}>
        </View>
        {
          focusTo === 'date' ?
          <View style={{flex: 1}}>
            <TouchableOpacity onPress={this.onNeedNow}>
              <View style={styles.dateTitleView}>
                <Image source={ClockIcon} style={styles.docIcon} />
                <Text style={styles.needSomeBodyText}>Need somebody now?</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.dateButtonView}>
              <TouchableOpacity style={{flex: 1}} onPress={this.onPressStartDate}>
                <View style={[
                  styles.dateButton, 
                  {borderBottomColor: dateToggle === 'start' ? theme.colors.black : theme.colors.lightgray}
                ]}>
                  <Text style={styles.needSomeBodyText}>START TIME</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={{flex: 1}} onPress={this.onPressEndDate}>
              <View style={[
                  styles.dateButton, 
                  {borderBottomColor: dateToggle === 'end' ? theme.colors.black : theme.colors.lightgray}
                ]}>
                  <Text style={styles.needSomeBodyText}>END TIME</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.datePickerView}>
                <TouchableOpacity onPress={this._showDateTimePicker} style={styles.datePickerWrapper}>
                  <Text style={styles.datePickerText}>{dateToggle === 'start' ? this.dateToString(startDate) : this.dateToString(endDate)}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonView}>
              <ButtonWithIcon
                style={{opacity: canGoNext ? 1 : 0.5}}
                text="NEXT"
                onPress={this.gotoStep2}
              />
            </View>
          </View>
          :
          <ScrollView style={{flex: 1}} keyboardShouldPersistTaps="always">
            {focusTo === 'title' && STINT_TYPE.map((item) => {
              return this.renderTitleItem(item)
            })}
            {focusTo === 'title' &&
              <TouchableOpacity onPress={this.goToSelectTitle}>    
                <View style={styles.titleItemView}>
                  <Image source={DocIcon} style={styles.docIcon} />
                  <Text style={styles.titleItemText}>Set Stint Type From List</Text>
                  <Icon name='ios-arrow-forward' style={styles.arrowIcon} />
                </View>
              </TouchableOpacity>
            }
            {focusTo === 'location' && POST_LOCATION.map((item) => {
              return this.renderLocationItem(item)
            })}
          </ScrollView>
        }
        <DateTimePicker
          isVisible={isDateTimePickerVisible}
          mode='datetime'
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
      </KeyboardAvoidingView>
      
    
    );
  }

  renderTitleItem = (item) => {
    const { title } = this.state;
    if(item.indexOf(title) < 0 || title === '') return null
    return (
      <TouchableOpacity key={item} onPress={() => this.onSelectTitle(item)}>      
        <View style={styles.titleItemView}>
          <Image source={DocIcon} style={styles.docIcon} />
          <Text style={styles.titleItemText}>{item}</Text>
        </View>      
      </TouchableOpacity>
    )
  }

  renderLocationItem = (item) => {
    const { location } = this.state;
    if(item.indexOf(location) < 0) return null
    return (
      <TouchableOpacity key={item} onPress={() => this.onSelectLocation(item)}>      
        <View style={styles.titleItemView}>
          <Image source={LocationIcon} style={styles.docIcon} />
          <Text style={styles.titleItemText}>{item}</Text>
        </View>      
      </TouchableOpacity>
    )
  }

  onSelectTitle(title) {
    this.setState({title})
    this.locationRef.focus()
  }

  onSelectLocation = (location) => {
    this.setState({location}, () => {
      this.checkValidLocation()
    })
    this.onSelectDate()
    this.locationRef.blur()
  }

  onSelectDate = () => {
    if(this.state.startDate !== null){
      this.setState({focusTo: 'date'})
    } else {
      const currentTime = new Date();
      this.setState({
        focusTo: 'date',
        startDate: new Date(currentTime.getTime() + 1800000),
        endDate: new Date(currentTime.getTime() + 3600000)
      })
    }    
    dismissKeyboard()
  }

  goToSelectTitle = () => {
    dismissKeyboard()
    NavigationService.navigate('SelectTitle', {onSelect: (title) => this.setState({title})});
  }

  gotoStep2 = () => {
    const { startDate, endDate, title, location } = this.state;
    const currentTime = new Date();
    const minDate = new Date(currentTime.getTime() + 3600000)
    if(this.dateToString(minDate) > this.dateToString(startDate)) {
      alert('Stints must be posted at least 30 minutes before their start time.')
    } else if(this.dateToString(startDate) > this.dateToString(endDate)) {
      alert('END TIME is incorrect')
    } else {
      this.props.updatePostStintData({ 
        title, 
        location, 
        startDate, 
        endDate,
        repeatDays: [0],
        numberOfStudent: 1
      })
      NavigationService.navigate('GiveInstruction')
    }
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(state => ({
  appState: state.appState,
}), mapDispatchToProps)(PostScreen);

