

/* jshint esversion: 6 *//* jshint node: true */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import {BoxShadow} from 'react-native-shadow'
import { Card } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../redux/actions';
import { STINT_TYPE } from '../../constants';
import NavigationService from '../../navigation/NavigationService';
import ScreenHeader from '../../components/Navigation/ScreenHeader';
import SearchInput from '../../components/Input/SearchInput';
import ButtonWithIcon from '../../components/Button/ButtonWithIcon';
import { dySize, getFontSize } from '../../utils/responsive';
import theme from '../../theme';

const EditIcon = require('../../assets/images/ui/pen-small-circle-dark.png');
const NoteIcon = require('../../assets/images/ui/note-dark-small.png');
const DressIcon = require('../../assets/images/ui/dress-code-dark-small.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    paddingHorizontal: dySize(15),
    paddingVertical: dySize(20)
  },
  logoView: {
    padding: dySize(40),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.black
  },
  logoText: {
    fontSize: getFontSize(40),
    color: theme.colors.white
  },
  cardView: {
    paddingHorizontal: dySize(15),
    paddingBottom: dySize(15),
  },
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: dySize(20),
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightgray
  },
  titleText: {
    fontSize: theme.FONT_SIZE_LARGE,
    fontWeight: 'bold'
  },
  editIcon: {
    width: dySize(30),
    height: dySize(30),
    resizeMode: 'contain'
  },
  infoView: {
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
  },
  noteIcon: {
    width: dySize(17),
    height: dySize(17),
    resizeMode: 'contain'
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
    padding: dySize(15),
    marginHorizontal: dySize(-15),
    borderTopColor: theme.colors.lightgray,
    borderTopWidth: 1
  }
});

class InstructionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {

  }

  render() {
    const { post: {post, instruction, uniform} } = this.props;
    return (
      <View style={styles.container}>
        <ScreenHeader
          backgroundColor={theme.colors.white}
          title="GIVE INSTRUCTIONS"
          leftIcon="md-arrow-back"
          onPressLeft={() => NavigationService.goBack()}
          textColor={theme.colors.black}
          borderBottomWidth={1}
        />
        <ScrollView contentContainerStyle={styles.content}>
          <Card>
            <View style={styles.logoView}>
              <Text style={styles.logoText}>STINT</Text>
            </View>
            <View style={styles.cardView}>
              <View style={styles.titleView}>
                <Text style={styles.titleText}>{post.title}</Text>
                <TouchableOpacity onPress={this.onPressEdit}>
                  <Image source={EditIcon} style={styles.editIcon} />
                </TouchableOpacity>
              </View>
              <View style={styles.infoView}>
                <Text style={styles.topText}>INSTRUCTIONS</Text>
                <View style={styles.bottomTextView}>
                  <Image source={NoteIcon} style={styles.noteIcon} />
                  <Text style={styles.bottomText}>{instruction.length === 0 ? 'Tap the pencil to edit...' : instruction}</Text>
                </View>
              </View>
              <View style={[styles.infoView, {borderBottomWidth: 0}]}>
                <Text style={styles.topText}>UNIFORM</Text>
                <View style={styles.bottomTextView}>
                  <Image source={DressIcon} style={styles.noteIcon} />
                  <Text style={styles.bottomText}>{uniform.length === 0 ? 'Tap the pencil to edit...' : uniform}</Text>
                </View>
              </View>
            </View>
          </Card>
          <Text style={styles.notifyText}>You can edit the details of your Stint by clicking the pencil.</Text>
          <View style={styles.buttonView}>
            <ButtonWithIcon
              text="DONE"
              onPress={this.onPressDone}
            />
          </View>
        </ScrollView>
      </View>
    );
  }

  onPressEdit = () => {
    NavigationService.navigate('EditInstruction')
  }

  onPressDone = () => {
    NavigationService.navigate('CheckOut')
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(state => ({
  post: state.post,
}), mapDispatchToProps)(InstructionScreen);


