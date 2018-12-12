

/* jshint esversion: 6 *//* jshint node: true */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';
import {BoxShadow} from 'react-native-shadow'
import { Card, Content } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../../redux/actions';
import NavigationService from '../../../../navigation/NavigationService';
import ScreenHeader from '../../../../components/Navigation/ScreenHeader';
import ButtonWithIcon from '../../../../components/Button/ButtonWithIcon';
import { dySize, getFontSize } from '../../../../utils/responsive';
import theme from '../../../../theme';

const NoteIcon = require('../../../../assets/images/ui/note-dark-small.png');
const DressIcon = require('../../../../assets/images/ui/dress-code-dark-small.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  content: {
    backgroundColor: theme.colors.white,
  },
  infoView: {
    padding: dySize(15),
    borderBottomColor: theme.colors.gray,
    borderBottomWidth: 1,
  },
  logoView: {
    padding: dySize(60),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.black
  },
  logoText: {
    fontSize: getFontSize(40),
    color: theme.colors.white
  },
  cardView: {
    paddingBottom: dySize(15),
  },
  editView: {
    paddingVertical: dySize(20),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightgray
  },
  topText: {
    fontSize: theme.FONT_SIZE_SMALL,
    marginBottom: dySize(20)
  },
  bottomTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: dySize(100)
  },
  noteIcon: {
    width: dySize(17),
    height: dySize(17),
    resizeMode: 'contain'
  },
  input: {
    flex: 1,
    height: dySize(40),
    justifyContent: 'center',
    paddingLeft: dySize(15),
    fontFamily: 'Montserrat-Regular',
  },
  bottomText: {
    fontSize: theme.FONT_SIZE_MEDIUM,
    marginLeft: dySize(10)
  },
  notifyText: {
    fontSize: theme.FONT_SIZE_SMALL,
    fontFamily: 'LibreBaskerville-Regular',
    backgroundColor: 'transparent',
    color: theme.colors.gray,
    margin: dySize(15)
  },
  buttonView: {
    height: dySize(50)
  }
});

class MyStintEditGuideScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instruction: '',
      uniform: ''
    };
  }

  componentDidMount() {
    this.setState({
      instruction: this.props.post.instruction,
      uniform: this.props.post.uniform
    })
  }

  render() {
    const { instruction, uniform } = this.state;
    const { post } = this.props
    return (
      <View style={styles.container}>
        <ScreenHeader
          backgroundColor={theme.colors.white}
          title="EDIT"
          leftIcon="md-arrow-back"
          rightText="RESET"
          onPressLeft={() => NavigationService.goBack()}
          onPressRight={this.onPressReset}
          textColor={theme.colors.black}
        />
        <Content contentContainerStyle={styles.content}>
          <View style={styles.infoView}>
            <View style={styles.logoView}>
              <Text style={styles.logoText}>STINT</Text>
            </View>
            <View style={styles.cardView}>
              <View style={styles.editView}>
                <Text style={styles.topText}>INSTRUCTIONS</Text>
                <View style={styles.bottomTextView}>
                  <Image source={NoteIcon} style={styles.noteIcon} />
                  <TextInput
                    placeholder="Add information..."
                    underlineColorAndroid='transparent'
                    style={styles.input}
                    onChangeText={(instruction) => this.setState({instruction})}
                    value={instruction}
                    maxLength={40}
                  />
                </View>
              </View>
              <View style={[styles.editView, {borderBottomWidth: 0}]}>
                <Text style={styles.topText}>UNIFORM</Text>
                <View style={styles.bottomTextView}>
                  <Image source={DressIcon} style={styles.noteIcon} />
                  <TextInput
                    placeholder="Add uniform requirements..."
                    underlineColorAndroid='transparent'
                    style={styles.input}
                    onChangeText={(uniform) => this.setState({uniform})}
                    value={uniform}
                    maxLength={40}
                  />
                </View>
              </View>
            </View>
          </View>
          <Text style={styles.notifyText}>You can edit the details of your Stint by clicking the pencil.</Text>
        </Content>
        {
          (instruction !== post.instruction || uniform !== post.uniform) &&
          <View style={styles.buttonView}>
            <ButtonWithIcon
              text="SAVE CHANGES"
              onPress={this.onSaveChanges}
            />
          </View>
        }        
      </View>
    );
  }

  onPressReset = () => {
    Alert.alert(
      'Are You Sure You Want to Reset the Guide to default?',
      'By tapping "Yes, reset" the Stint Guide is set to default and will delete all chagnes and added texts.',
      [
        {text: "DON'T ALLOW", onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'ALLOW', onPress: this.onReset},
      ],
      { cancelable: false }
    )
  }

  onReset = () => {
    alert('comming soon')
  }

  onSaveChanges = () => {
    const { instruction, uniform } = this.state;
    this.props.savePostStintInfo({
      instruction,
      uniform
    })
    NavigationService.goBack()
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(state => ({
  post: state.post,
}), mapDispatchToProps)(MyStintEditGuideScreen);


