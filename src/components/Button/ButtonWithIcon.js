import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import PropTypes from 'prop-types';
import Ripple from 'react-native-material-ripple';

import theme from '../../theme';
import { dySize } from '../../utils/responsive';

const buttonIcon = require('../../assets/images/welcome-screen/string-logo-top-light.png');
const styles = StyleSheet.create({
  buttonView: {
    height: dySize(50),
    backgroundColor: theme.colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  buttonIcon: {
    width: dySize(36),
    height: dySize(36),
    position: 'absolute',
    right: dySize(7),
    top: dySize(7),
    opacity: 0.3
  },
  buttonText: {
    color: theme.colors.white,
    fontFamily: 'Montserrat-Medium',
    fontSize: theme.FONT_SIZE_MEDIUM
  },
})

class ButtonWithIcon extends Component {
  
  constructor(props) {
    super(props);
    this.state = {

    };
  }
    
  static propTypes = {
    text: PropTypes.string.isRequired,
    icon: PropTypes.any,
    backgroundColor: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    style: PropTypes.object
  }

  static defaultProps = {
    icon: buttonIcon,
    backgroundColor: 'black',
    style: { height: dySize(60) }
  }

  render() {
    const { 
      text,
      icon,
      backgroundColor,
      onPress,
      style
    } = this.props;

    const buttonWrapperStyle = {
      height: dySize(60)
    }
    return (
      <Ripple
        style={[buttonWrapperStyle, style]}
        onPress={onPress}
        rippleColor={theme.colors.gray}
        rippleSize={300}
        rippleDuration={300}
        rippleContainerBorderRadius={60}>
        <View style={[styles.buttonView, {backgroundColor}]}>
          <Text style={styles.buttonText}>{text}</Text>
          { icon !== null && <Image source={icon} style={styles.buttonIcon} />}
        </View>
      </Ripple>
    );
  }
}

export default ButtonWithIcon;

