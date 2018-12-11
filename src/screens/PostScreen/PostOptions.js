

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
import * as _ from 'lodash'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../redux/actions';
import NavigationService from '../../navigation/NavigationService';
import ScreenHeader from '../../components/Navigation/ScreenHeader';
import SearchInput from '../../components/Input/SearchInput';
import ButtonWithIcon from '../../components/Button/ButtonWithIcon';
import { dySize } from '../../utils/responsive';
import * as Operations from '../../utils/operators';
import theme from '../../theme';
import { Icon,  Button } from 'native-base';

const dayTimeStamp = 86400000;
const dateArray = ['MON','TUE','WED','THU','FRI','SAT','SUN']
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  sectionView: {
    height: dySize(40),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightgray
  },
  sectionText: {
    fontSize: theme.FONT_SIZE_SMALL,
    fontFamily: 'Montserrat-Regular'
  },
  numberView: {
    height: dySize(60),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: dySize(15),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightgray
  },
  numberButtonView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  numberButton: {
    width: dySize(30),
    height: dySize(30),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.black,
  },
  icon: {
    fontSize: theme.FONT_SIZE_MEDIUM,    
    color: theme.colors.black,    
  },
  numberButtonGray: {
    width: dySize(30),
    height: dySize(30),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.lightgray,
  },
  iconGray: {
    fontSize: theme.FONT_SIZE_MEDIUM,    
    color: theme.colors.lightgray,    
  },
  numberText: {
    fontFamily: 'Montserrat-Medium',
    paddingHorizontal: dySize(20)
  },
  dateView: {
    height: dySize(100),
    paddingHorizontal: dySize(10),
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightgray
  },
  dateItem: {
    flex: 1,
    paddingVertical: dySize(15),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weekdayText: {
    fontSize: theme.FONT_SIZE_MEDIUM,
    fontFamily: 'Montserrat-Regular'
  },
  bottomView: {
    flex: 1,
    padding: dySize(15),
    justifyContent: 'space-between',
    backgroundColor: '#EEEEEE'
  },
  bottomText: {
    fontSize: theme.FONT_SIZE_SMALL,
    fontFamily: 'LibreBaskerville-Regular',
    lineHeight: dySize(24),
    color: theme.colors.gray
  }

});

class PostOptionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDateArray: [0],
      number: 1
    };
  }

  componentDidMount() {
    const { post: { post }} = this.props;
    const _repeatDays = Object.create(post.repeatDays);
    this.setState({
      selectedDateArray: _repeatDays,
      number: post.numberOfStudent
    })
  }

  render() {   
    const { selectedDateArray, number } = this.state;
    const { post: { post }} = this.props;
    return (
      <View style={styles.container}>
        <ScreenHeader
          backgroundColor={theme.colors.white}
          title="ADD A WORKER"
          leftIcon="md-arrow-back"
          onPressLeft={() => NavigationService.goBack()}
          textColor={theme.colors.black}
          borderBottomWidth={1}
        />
        <View style={styles.sectionView}>
          <Text style={styles.sectionText}>HOW MANY STUDENTS?</Text>
        </View>
        <View style={styles.numberView}>
          <Text style={styles.sectionText}>Stint Student</Text>
          <View style={styles.numberButtonView}>
            <TouchableOpacity 
              style={number < 2 ? styles.numberButtonGray : styles.numberButton} 
              onPress={this.decreaseNumber}
            >
              <Icon name="md-remove" style={number < 2 ? styles.iconGray : styles.icon}/>
            </TouchableOpacity>
            <Text style={styles.numberText}>{number}</Text>
            <TouchableOpacity 
              style={number > 4 ? styles.numberButtonGray : styles.numberButton} 
              onPress={this.increaseNumber}
            >
              <Icon name="md-add" style={number > 4 ? styles.iconGray : styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.sectionView}>
          <Text style={styles.sectionText}>REPEAT ON THE FOLLOWING DATES</Text>
        </View>
        <View style={styles.dateView}>
        {
          dateArray.map((item, index) => {
            let dateStyle = {
              padding: dySize(10),
            };
            let dateTextStyle = {
              fontSize: theme.FONT_SIZE_MEDIUM,
              fontFamily: 'Montserrat-Regular'
            }
            if(selectedDateArray.indexOf(index) > -1) {
              dateStyle = {
                padding: dySize(10),
                backgroundColor: theme.colors.black,
                borderRadius: dySize(4)
              }
              dateTextStyle = {
                fontSize: theme.FONT_SIZE_MEDIUM,
                fontFamily: 'Montserrat-Regular',
                color: theme.colors.white
              }
            }
            return(
              <View key={index} style={styles.dateItem}>
                <Text style={styles.weekdayText}>{this.getWeekDay(index)}</Text>
                <TouchableOpacity 
                  style={dateStyle}
                  onPress={() => this.onPressDate(index)}
                >
                  <Text style={dateTextStyle}>{this.getDate(index)}</Text>
                </TouchableOpacity>                
              </View>
            )
          })
        }          
        </View>
        <View style={styles.bottomView}>
          <Text style={styles.bottomText}>
            You can add another Stint Student and select days on which the Stint should be repeated.
          </Text>
          {
            this.getIsChanged() &&
            <ButtonWithIcon
              text="SAVE"
              onPress={this.onPressSave}
            />
          }          
        </View>
      </View>
    );
  }

  getIsChanged = () => {
    const { post: { post }} = this.props;
    const array1 = this.state.selectedDateArray;
    const array2 = post.repeatDays;
    console.log(post.numberOfStudent);
    console.log(this.state.number)
    if(!Operations.isEqualArray(array1, array2)) return true;
    else if(post.numberOfStudent !== this.state.number) return true;
    return false
  }

  increaseNumber = () => {
    const { number } = this.state;
    if(number === 5) return;
    this.setState({number: number + 1})
  }

  decreaseNumber = () => {
    const { number } = this.state;
    if(number === 1) return;
    this.setState({number: number - 1})
  }

  onPressDate = (index) => {
    if(index === 0) return;
    const { selectedDateArray } = this.state;
    const pos = selectedDateArray.indexOf(index);
    if(pos < 0) {
      selectedDateArray.push(index);      
    } else {
      selectedDateArray.splice(pos, 1);
    }
    this.setState({selectedDateArray})
  }

  getWeekDay = (index) => {
    const { post: { post }} = this.props;
    const T = new Date(post.startDate).getTime() + dayTimeStamp * index;
    return Moment(T).format('ddd');
  }

  getDate = (index) => {
    const { post: { post }} = this.props;
    const T = new Date(post.startDate).getTime() + dayTimeStamp * index;
    return Moment(T).format('DD').toUpperCase();
  }

  onPressSave = () => {
    this.props.updatePostStintData({
      numberOfStudent: this.state.number,
      repeatDays: this.state.selectedDateArray
    })
    NavigationService.goBack()
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(state => ({
  post: state.post,
}), mapDispatchToProps)(PostOptionScreen);


