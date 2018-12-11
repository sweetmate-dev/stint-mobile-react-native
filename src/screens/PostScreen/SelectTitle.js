

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
import { BoxShadow } from 'react-native-shadow'
import theme from '../../theme';
import { STINT_TYPE } from '../../constants';
import NavigationService from '../../navigation/NavigationService';
import ScreenHeader from '../../components/Navigation/ScreenHeader';
import SearchInput from '../../components/Input/SearchInput';
import { dySize } from '../../utils/responsive';

const DocIcon = require('../../assets/images/ui/document-dark-small.png');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  ItemView: {
    height: dySize(50),
    padding: dySize(15),
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightgray,
    backgroundColor: theme.colors.white
  },
  ItemText: {
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
  generalView: {
    height: dySize(40),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    borderBottomColor: theme.colors.lightgray,
    borderBottomWidth: 1
  },
  generalText: {
    fontSize: theme.FONT_SIZE_SMALL,
    fontFamily: 'Montserrat-Regular',
  },
  bottomView: {
    height: dySize(80),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    padding: dySize(15),    
  },
  bottomText: {
    fontSize: theme.FONT_SIZE_SMALL,
    fontFamily: 'LibreBaskerville-Regular',
    lineHeight: dySize(20),
    color: theme.colors.gray
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#EEEEEE'
  }
});

export default class SelectTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    };
  }

  componentDidMount() {

  }

  render() {
    const { searchText } = this.state;
    const shadowOpt = {
      width: dySize(375),
      height: dySize(60),
      color: theme.colors.darkgray,
      border: 2,
      radius: 0,
      opacity: 0.5,
      x:2,
      y:3,
    }

    return (
      <View style={styles.container}>
        <ScreenHeader
          backgroundColor={theme.colors.white}
          title="SET STINT TYPE"
          leftIcon="md-arrow-back"
          onPressLeft={() => NavigationService.goBack()}
          textColor={theme.colors.black}
        />
        <BoxShadow setting={shadowOpt}>
          <SearchInput
            value={searchText}
            onChange={(text) => this.setState({searchText: text})}
            placeholder="Search for stint type"
          />
        </BoxShadow>
        
        <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="always">
          <View style={styles.generalView}>
            <Text style={styles.generalText}>General</Text>
          </View>
          {STINT_TYPE.map((item) => {
            return this.renderTitleItem(item)
          })}
          <View style={styles.bottomView}>
            <Text style={styles.bottomText}>You must select a Stint Type in order to find the perfect Stint Student for your task.</Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  onSelect(item) {
    this.props.navigation.state.params.onSelect(item);
    NavigationService.goBack()
  }

  renderTitleItem = (item) => {
    const { searchText } = this.state;
    if(item.indexOf(searchText) < 0) return null
    return (
      <TouchableOpacity key={item} onPress={() => this.onSelect(item)}>      
        <View style={styles.ItemView}>
          <Image source={DocIcon} style={styles.docIcon} />
          <Text style={styles.ItemText}>{item}</Text>
        </View>      
      </TouchableOpacity>
    )
  }
}

