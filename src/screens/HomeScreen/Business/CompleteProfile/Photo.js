

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
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../../redux/actions';
import NavigationService from '../../../../navigation/NavigationService';
import ScreenHeader from '../../../../components/Navigation/ScreenHeader';
import SearchInput from '../../../../components/Input/SearchInput';
import ButtonWithIcon from '../../../../components/Button/ButtonWithIcon';
import { dySize } from '../../../../utils/responsive';
import theme from '../../../../theme';

const avatarIcon = require('../../../../assets/images/profile-photo/profile-photo.png');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  photoView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  avatar: {
    width: dySize(140),
    height: dySize(140),
    resizeMode: 'cover'
  },
  photoText: {
    fontSize: theme.FONT_SIZE_SMALL,
    fontFamily: 'Montserrat-Regular',
    color: theme.colors.lightgray,
    marginTop: dySize(10)
  },
  bottomView: {
    backgroundColor: '#EEEEEE',
    padding: dySize(15),
    borderTopWidth: 1,
    borderTopColor: theme.colors.lightgray
  },
  bottomText: {
    fontSize: theme.FONT_SIZE_SMALL,
    fontFamily: 'LibreBaskerville-Regular',
    color: theme.colors.gray,
    lineHeight: dySize(22),
    marginBottom: dySize(30)
  },
});

class CompletePhotoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: avatarIcon
    };
  }

  componentDidMount() {

  }

  onPressSkip = () => {
    this.props.updateCompleteProfileState({ photo: true })
  }

  onPressNext = () => {
    this.props.updateCompleteProfileState({ photo: true })
  }

  onClickPhoto = () => {
    const options = {
      title: 'Select Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        this.setState({ avatar: source });
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScreenHeader
          backgroundColor={theme.colors.white}
          title="PROFILE PHOTO"
          leftIcon="md-arrow-back"
          rightText="SKIP"
          onPressLeft={() => NavigationService.goBack()}
          onPressRight={this.onPressSkip}
          textColor={theme.colors.black}
          borderBottomWidth={1}
        />
        <View style={styles.photoView}>
          <TouchableOpacity onPress={this.onClickPhoto}>
            <Image source={this.state.avatar} style={styles.avatar} />
          </TouchableOpacity>
          <Text style={styles.photoText}>CLICK ME TO SET PHOTO</Text>
        </View>
        <View style={styles.bottomView}>
          <Text style={styles.bottomText}>We need a profile photo of you that clearly shows your face and doesn't include any personal and sensitive information.</Text>
          <ButtonWithIcon
            text="NEXT"
            onPress={this.onPressNext}
          />
        </View>
        
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(state => ({
  appState: state.appState,
}), mapDispatchToProps)(CompletePhotoScreen);


