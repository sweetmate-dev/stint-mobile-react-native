

/* jshint esversion: 6 *//* jshint node: true */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../redux/actions';
import { Container } from 'native-base';
import ScreenHeader from '../../components/Navigation/ScreenHeader';
import NavigationService from '../../navigation/NavigationService';
import theme from '../../theme';
import { dySize } from '../../utils/responsive';

const UniIcon = require('../../assets/images/mock/lima-review-logo.png');
const styles = StyleSheet.create({
  sectionView: {
    height: dySize(40),
    backgroundColor: '#EEEEEE',
    borderTopWidth: 1,
    borderTopColor: theme.colors.lightgray,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightgray,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sectionText: {
    fontSize: theme.FONT_SIZE_SMALL,
    fontFamily: 'Montserrat-Regular' 
  },
  itemView: {
    height: dySize(50),
    justifyContent: 'center',
    marginLeft: 50,
    position: 'relative',
    borderBottomColor: theme.colors.lightgray,
    borderBottomWidth: 1
  },
  icon: {
    position: 'absolute',
    top: dySize(15),
    bottom: dySize(15),
    left: dySize(-30),
    width: dySize(20),
    height: dySize(20),
    resizeMode: 'contain'
  },
  getNotified: {
    height: dySize(50),
    paddingHorizontal: dySize(20),
    justifyContent: 'center',
    borderBottomColor: theme.colors.lightgray,
    borderBottomWidth: 1
  },
  itemText: {
    fontSize: theme.FONT_SIZE_MEDIUM,
    fontFamily: 'Montserrat-Regular'
  }
});

class SignUpStudentPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {

  }

  render() {
    const { temp } = this.props;


    return (
      <Container>
        <ScreenHeader
          backgroundColor={theme.colors.white}
          title="SELECT YOUR UNIVERSITY"
          leftIcon="md-close"
          onPressLeft={() => NavigationService.goBack()}
        />
        <ScrollView>
          <View style={styles.sectionView}>
            <Text style={styles.sectionText}>STINT UNIVERSITY</Text>
          </View>
          {
            temp.university_list.map((university, index) => {
              return (
                <Ripple
                  key={university.name}
                  onPress={() => this.onSelectUniversity(university)}
                  rippleColor={theme.colors.gray}
                  rippleSize={300}
                  rippleDuration={300}
                  rippleContainerBorderRadius={60}>
                  <View style={[styles.itemView, {borderBottomWidth: index === temp.university_list.length - 1 ? 0 : 1}]}>
                    <Image source={UniIcon} style={styles.icon}/>
                    <Text style={styles.itemText}>{university.name}</Text>
                  </View>
                </Ripple>
              )
            })
          }
          <View style={styles.sectionView}>
            <Text style={styles.sectionText}>MISSING A UNIVERSITY</Text>
          </View>
          <Ripple
            onPress={() => this.onMissUniversity()}
            rippleColor={theme.colors.gray}
            rippleSize={300}
            rippleDuration={300}
            rippleContainerBorderRadius={60}>
            <View style={styles.getNotified}>
              <Text style={styles.itemText}>GET NOTIFIED</Text>
            </View>
          </Ripple>
        </ScrollView>
      </Container>
      
    
    );
  }

  onSelectUniversity(university) {
    this.props.setUniversity(university);
    NavigationService.goBack();
  }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ActionCreators, dispatch);
  }
export default connect(state => ({
  temp: state.temp,
}), mapDispatchToProps)(SignUpStudentPopUp);

