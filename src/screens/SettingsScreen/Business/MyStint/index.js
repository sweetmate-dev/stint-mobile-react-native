

/* jshint esversion: 6 *//* jshint node: true */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';
import { Card, Icon } from 'native-base';
import Moment from 'moment';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../../redux/actions';
import NavigationService from '../../../../navigation/NavigationService';
import ScreenHeader from '../../../../components/Navigation/ScreenHeader';
import SearchInput from '../../../../components/Input/SearchInput';
import { dySize, getFontSize } from '../../../../utils/responsive';
import theme from '../../../../theme';

const MonthArray = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const stintLogo = require('../../../../assets/images/profile-photo/business-logo.png');
const clockIcon = require('../../../../assets/images/ui/clock-dark-small.png');
const knobIcon = require('../../../../assets/images/ui/chevron-bottom-dark.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerDate: {
    marginTop: dySize(15),
    textAlign: 'center',
    fontSize: theme.FONT_SIZE_MEDIUM,
    fontFamily: 'Montserrat-Regular',
  },
  listItemView: {
    paddingVertical: dySize(10),
    flexDirection: 'row'
  },
  listItemRight: {
    flex: 1,
    paddingLeft: dySize(15)
  },
  dateText: {
    fontSize: getFontSize(24),
    textAlign: 'center',
    width: dySize(40)
  },
  weekText: {
    fontSize: theme.FONT_SIZE_SMALL,
    textAlign: 'center',
    width: dySize(40)
  },
  stintView: {
    flexDirection: 'row',
    padding: dySize(10),
    backgroundColor: theme.colors.white,
    alignItems: 'center'
  },
  logo: {
    width: dySize(40),
    height: dySize(40),
    resizeMode: 'stretch',
    marginRight: dySize(15),
  },
  stintInfoView: {
    justifyContent: 'space-between',
    flex: 1,
  },
  stintTitleText: {
    fontSize: getFontSize(14),
    fontFamily: 'Montserrat-Regular'
  },
  timeView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  clockIcon: {
    width: dySize(10),
    height: dySize(10),
    resizeMode: 'stretch',
  },
  stintTimeText: {
    fontSize: theme.FONT_SIZE_SMALL,
    fontFamily: 'Montserrat-Regular'
  },
  arrowIcon: {
    fontSize: theme.FONT_SIZE_MEDIUM,
  }
});

class MyStintListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateHeader: '',
      markedData: {},
      items: {}
    };
  }

  componentDidMount() {
    let markedData = {}
    this.props.user.myStints.map((stint) => {
      markedData[stint.date] = {marked: true, dotColor: 'black', activeOpacity: 0}
    })
    const dateHeader = MonthArray[new Date().getMonth() + 1] + ' ' + new Date().getFullYear()
    this.setState({markedData, dateHeader})
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  loadItemsForMonth = (month) => {
    setTimeout(() => {
      for (let i = 0; i < 85; i++) {
        const time = month.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [{
            date: strTime,
            week: Moment(new Date(time)).format('ddd').toUpperCase(),
          }]
        }
      }
      //console.log(this.state.items);
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        month,
        items: newItems
      });
    }, 1000);
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  onChangeDay = (day) => {
    this.setState({dateHeader: MonthArray[day.month] + ' ' + day.year});
  }

  onPressStint = (stint) => {
    NavigationService.navigate('MyStint', {stint})
  }

  render() {
    const { markedData, dateHeader } = this.state;

    return (
      <View style={styles.container}>
        <ScreenHeader
          backgroundColor={theme.colors.white}
          title="MY STINTS"
          leftIcon="md-arrow-back"
          onPressLeft={() => NavigationService.goBack()}
          textColor={theme.colors.black}
          borderBottomWidth={1}
        />
        <Text style={styles.headerDate}>{dateHeader}</Text>
        <Agenda
          items={this.state.items}
          minDate={'2014-08-01'}
          maxDate={'2022-12-31'}
          loadItemsForMonth={(month) => this.loadItemsForMonth(month)}
          renderKnob={() => <Image source={knobIcon} style={styles.arrowIcon} />}
          firstDay={1}
          markedDates={markedData}
          theme={{
            textDayFontFamily: 'Montserrat-Medium',
            textMonthFontFamily: 'Montserrat-Regular',
            textDayHeaderFontFamily: 'Montserrat-Regular',
            agendaDayTextColor: 'black',
            agendaDayNumColor: '#111111',
            agendaKnobColor: 'black',
            'stylesheet.day.basic': {
              selected: {
                backgroundColor: theme.colors.black,
                borderRadius: 6,
                height: 36,
                width: 36,
              },
              selectedDot: {
                backgroundColor: theme.colors.black,
              },
              selectedText: {
                color: theme.colors.white,
              },
              dot: {
                width: 4,
                height: 4,
                marginTop: 1,
                borderRadius: 0,
                opacity: 0,
              },
              todayText: {
                color: '#599DC2',
              },
            }
          }}
          renderItem={this.renderItem}
          rowHasChanged={this.rowHasChanged.bind(this)}
          onDayChange={(day) => this.onChangeDay(day)}
        />  
      </View>
    );
  }

  renderItem = (item) => {
    const { user: {myStints} } = this.props;
    return (
      <View style={styles.listItemView}>
        <View style={styles.listItemRight}>
          <ScrollView>
            {
              myStints.map((stint) => {
                const T = new Date(stint.date)
                if(stint.date === item.date){
                  return this.renderStintItem(stint)
                } else {
                  return null
                }                
              })
            }
          </ScrollView>
        </View>
      </View>      
    );
  }

  renderStintItem = (stint) => {
    return (
      <TouchableOpacity onPress={() => this.onPressStint(stint)}>      
        <Card style={{flex: 1}}>
          <View style={styles.stintView}>          
            <Image source={stintLogo} style={styles.logo} />
            <View style={styles.stintInfoView}>
              <Text style={styles.stintTitleText}>{stint.title}</Text>
              <View style={styles.timeView}>
                <Image source={clockIcon} style={styles.clockIcon} />
                <Text style={styles.stintTimeText}>{stint.from} - {stint.to}</Text>
              </View>
            </View>
            <Icon name='ios-arrow-forward' style={styles.arrowIcon} />
          </View>
        </Card>
      </TouchableOpacity>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(state => ({
  user: state.user,
}), mapDispatchToProps)(MyStintListScreen);


