import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import {
  Header,
  Title,
  Left,
  Right,
  Button,
  Body,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from '../../theme';
import { getFontSize, dySize } from '../../utils/responsive';

const styles = StyleSheet.create({
  rightView: {
    flex: 1,
    alignItems: 'flex-end',
  },
  leftView: {
    flex: 1,
  }
});

class ScreenHeader extends Component {
  
  static propTypes = {
    backgroundColor: PropTypes.string,
    title: PropTypes.string.isRequired,
    rightIcon: PropTypes.string,
    rightText: PropTypes.string,
    leftIcon: PropTypes.string,
    leftText: PropTypes.string,
    textColor: PropTypes.string,
    onPressLeft: PropTypes.func,
    onPressRight: PropTypes.func,
    borderBottomWidth: PropTypes.number
  }

  static defaultProps = {
    backgroundColor: 'transparent',
    title: '',
    rightIcon: '',
    rightText: '',
    leftIcon: '',
    leftText: '',
    textColor: theme.colors.black,
    onPressLeft: () => undefined,
    onPressRight: () => undefined,
    borderBottomWidth: 0
  }

  render() {
    const { 
      backgroundColor, 
      title, 
      rightIcon, 
      rightText, 
      leftIcon, 
      leftText, 
      textColor,
      borderBottomWidth
    } = this.props;
    const headerStyle = {
      backgroundColor,
      borderBottomColor: theme.colors.lightgray,
      borderBottomWidth: borderBottomWidth,
      elevation: 0,
      paddingHorizontal: dySize(10)
    }
    const headerText = {
      fontSize: theme.FONT_SIZE_MEDIUM,
      fontFamily: 'Montserrat-Regular',
      color: textColor,
      textAlign: 'center',
    }
    const buttonText = {
      fontSize: getFontSize(14),
      fontFamily: 'Montserrat-Medium',
      color: textColor,
    }
    return (
      <Header style={headerStyle}>
        <Left style={styles.leftView}>
          {
            leftIcon.length > 0 &&
            <Button
              transparent
              onPress={() => this.props.onPressLeft()}
            >
              <Ionicons name={leftIcon} size={26} color={textColor} />
            </Button>
          }
          {
            leftText.length > 0 &&
            <Text
              transparent
              onPress={() => this.props.onPressLeft()}
            >
              <Text style={buttonText}>{leftText}</Text>
            </Text>
          }          
        </Left>
        <Body style={{flex: 4, alignItems: 'center'}}>
          <Title style={headerText}>{title}</Title>
        </Body>
        <Right style={styles.rightView}>
          {
            rightIcon.length > 0 &&
            <Button
              transparent
              onPress={() => this.props.onPressRight()}
            >
              <Ionicons name={rightIcon} size={26} color={textColor} />
            </Button>
          }
          {
            rightText.length > 0 &&
            <Text
              transparent
              onPress={() => this.props.onPressRight()}
              style={styles.rightView}
            >
              <Text style={[buttonText, {textAlign: 'right'}]}>{rightText}</Text>
            </Text>
          }   
        </Right>
      </Header>
    );
  }
}

export default ScreenHeader;
