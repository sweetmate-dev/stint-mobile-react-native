

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
import { Content, Icon } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../../redux/actions';
import NavigationService from '../../../../navigation/NavigationService';
import ButtonWithIcon from '../../../../components/Button/ButtonWithIcon';
import ScreenHeader from '../../../../components/Navigation/ScreenHeader';
import ValidationInput from '../../../../components/Input/ValidationInput';
import { dySize, getFontSize } from '../../../../utils/responsive';
import theme from '../../../../theme';
import { EUROPE_COUNTRIES } from '../../../../constants';

const avatar = require('../../../../assets/images/welcome-screen/first.png');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    backgroundColor: '#EEEEEE'
  },
  infoView: {
    paddingHorizontal: dySize(15),
    backgroundColor: theme.colors.white
  },
  bottomView: {
    padding: dySize(15),
    backgroundColor: '#EEEEEE',
    borderTopWidth: 1,
    borderTopColor: theme.colors.lightgray,    
  },
  bottomText: {
    color: theme.colors.gray,
    fontSize: theme.FONT_SIZE_SMALL,
    fontFamily: 'LibreBaskerville-Regular'
  },
  avatar: {
    width: dySize(100),
    height: dySize(100),
    resizeMode: 'cover',
    marginVertical: dySize(35)
  },
  country: {
    fontSize: getFontSize(24),
    fontFamily: 'LibreBaskerville-Italic',
    color: theme.colors.gray,
    flex: 1,
  },
  countryView: {
    marginVertical: dySize(10),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightgray,
  },
  countryText: {
    fontSize: theme.FONT_SIZE_SMALL,
    fontFamily: 'Montserrat-Regular',
  },
  pickerView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  flag: {
    width: dySize(30),
    height: dySize(20),
    resizeMode: 'contain',
    marginRight: dySize(10)
  },
  arrowIcon: {
    fontSize: theme.FONT_SIZE_LARGE,
  }
});

class BusinessDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      city: '',
      code: '',
      photo: avatar,
      country: 'UK',
      mobile: ''
    };
  }

  componentDidMount() {
    const { 
      user: { 
        business: {
          name, 
          address, 
          city, 
          code,
          country,
          mobile
        }
      }
    } = this.props;
    this.setState({name, address, city, code, country, mobile});
  }

  onPressSave = () => {

  }

  onPressPhoto = () => {
    const options = {
      title: 'Select Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        this.setState({ photo: source });
      }
    });
  }

  onClickFlag = () => {
    NavigationService.navigate('BusinessDetailSelectCountry');
  }

  InfoChanged = () => {
    const { name, address, city, code, country, mobile } = this.state;
    return (
      name !== this.props.user.business.name ||
      address !== this.props.user.business.address ||
      city !== this.props.user.business.city ||
      code !== this.props.user.business.code ||
      country !== this.props.user.business.country ||
      mobile !== this.props.user.business.mobile
    )
  }

  render() {
    
    const { name, address, city, code, photo, mobile } = this.state;
    const { country } = this.props.user
    return (
      <View style={styles.container}>
        <ScreenHeader
          backgroundColor={theme.colors.white}
          title="EDIT BUSINESS DETAILS"
          leftIcon="md-arrow-back"
          onPressLeft={() => NavigationService.goBack()}
          textColor={theme.colors.black}
          borderBottomWidth={1}
        />
        <Content style={styles.content}>
          <View style={styles.infoView}>          
            <TouchableOpacity onPress={this.onPressPhoto}>
              <Image source={photo} style={styles.avatar} />
            </TouchableOpacity>
            <ValidationInput
              label="BUSINESS NAME"
              value={name}
              onChange={(name) => this.setState({name})}
              maxLength={40}
            />
            <ValidationInput
              label="FIRST LINE ADDRESS"
              value={address}
              onChange={(address) => this.setState({address})}
              maxLength={50}
            />
            <ValidationInput
              label="CITY"
              value={city}
              onChange={(city) => this.setState({city})}
              maxLength={20}
            />
            <ValidationInput
              label="POST CODE"
              value={code}
              onChange={(code) => this.setState({code})}
              maxLength={10}
            />
            <View style={styles.countryView}>
              <Text style={styles.countryText}>COUNTRY</Text>
              <TouchableOpacity onPress={this.onClickFlag}>              
                <View style={styles.pickerView}>
                  <Image source={EUROPE_COUNTRIES[country]['flag']} style={styles.flag} />
                  <Text style={styles.country}>{EUROPE_COUNTRIES[country]['label']}</Text>
                  <Icon name="ios-arrow-down" style={styles.arrowIcon} />
                </View>
              </TouchableOpacity>
            </View>
            <ValidationInput
              label="MOBILE NUMBER"
              value={mobile}
              onChange={(mobile) => this.setState({mobile})}
              maxLength={13}
            />
          </View>
          <View style={styles.bottomView}>
            <Text style={styles.bottomText}>You can review and edit your business details here</Text>
          </View>
        </Content>
        {
          this.InfoChanged() &&
          <ButtonWithIcon
            text="SAVE CHANGES"
            onPress={this.onPressSave}
            style={{height: dySize(50)}}
          />
        }
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(state => ({
  user: state.user,
}), mapDispatchToProps)(BusinessDetailScreen);


