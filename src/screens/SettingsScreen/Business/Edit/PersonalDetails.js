

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
import { Content } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../../redux/actions';
import NavigationService from '../../../../navigation/NavigationService';
import ButtonWithIcon from '../../../../components/Button/ButtonWithIcon';
import ScreenHeader from '../../../../components/Navigation/ScreenHeader';
import ValidationInput from '../../../../components/Input/ValidationInput';
import { dySize } from '../../../../utils/responsive';
import theme from '../../../../theme';

const avatar = require('../../../../assets/images/welcome-screen/second.png');
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
  }
});

class BusinessPersonalDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      mobile: '',
      photo: avatar,
      password: ''
    };
  }

  componentDidMount() {
    const { user: { personal: {first_name, last_name, email, mobile}} } = this.props;
    this.setState({first_name, last_name, email, mobile});
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

  InfoChanged = () => {
    const { first_name, last_name, mobile, email, password } = this.state;
    return (
      first_name !== this.props.user.personal.first_name ||
      last_name !== this.props.user.personal.last_name ||
      mobile !== this.props.user.personal.mobile ||
      email !== this.props.user.personal.email ||
      password.legnth > 0
    )
  }

  render() {
    
    const { first_name, last_name, email, mobile, photo, password } = this.state;
    return (
      <View style={styles.container}>
        <ScreenHeader
          backgroundColor={theme.colors.white}
          title="EDIT PERSONAL DETAILS"
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
              label="FIRST NAME"
              value={first_name}
              onChange={(first_name) => this.setState({first_name})}
              maxLength={40}
            />
            <ValidationInput
              label="LAST NAME"
              value={last_name}
              onChange={(last_name) => this.setState({last_name})}
              maxLength={40}
            />
            <ValidationInput
              label="E-MAIL"
              value={email}
              onChange={(email) => this.setState({email})}
              maxLength={50}
            />
            <ValidationInput
              label="MOBILE PHONE NUMBER"
              value={mobile}
              onChange={(mobile) => this.setState({mobile})}
              maxLength={13}
            />
            <ValidationInput
              label="PASSWORD"
              value={password}
              onChange={(password) => this.setState({password})}
              maxLength={20}
            />
          </View>
          <View style={styles.bottomView}>
            <Text style={styles.bottomText}>You can review and edit your personal details here</Text>
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
}), mapDispatchToProps)(BusinessPersonalDetailScreen);


