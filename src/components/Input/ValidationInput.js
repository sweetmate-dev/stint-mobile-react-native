import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import {
  Input
} from 'native-base';
import theme from '../../theme';
import { dySize } from '../../utils/responsive';

const styles = StyleSheet.create({
  container: {    
    marginVertical: dySize(5)
  },
  labelText: {
    color: theme.colors.gray,
    fontSize: theme.FONT_SIZE_SMALL,
    paddingVertical: 3,
    fontFamily: 'Montserrat-Regular',
    height: dySize(20)
  },
  inputView: {
    position: 'relative', 
    height: dySize(40)
  },
  errorText: {
    fontSize: theme.FONT_SIZE_SMALL,
    color: theme.colors.red,
    paddingVertical: 3,
    fontFamily: 'Montserrat-Regular'
  },
  iconView: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center'
  },  
})

class ValidationInput extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false
    };
  }
    
  static propTypes = {
    label: PropTypes.string,
    errorText: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    empty: PropTypes.bool,
    style: PropTypes.object,
    value: PropTypes.string.isRequired,
    isError: PropTypes.bool,
    isSecure: PropTypes.bool,
    capitalize: PropTypes.bool,
    children: PropTypes.node,
    keyboardType: PropTypes.string,
    editable: PropTypes.bool,
    isRequired: PropTypes.bool,
    maxLength: PropTypes.number
  }

  static defaultProps = {
    label: '',
    errorText: '',
    empty: false,
    style: {},
    isError: false,
    isSecure: false,
    capitalize: 'words',
    children: undefined,
    keyboardType: 'default',
    editable: true,
    isRequired: true,
    maxLength: 40
  }

  render() {
    const { 
      label,
      errorText,
      empty,
      style,
      value,
      isError,
      isSecure,
      capitalize,
      children,
      keyboardType,
      editable,
      isRequired,
      maxLength
    } = this.props;
    const { isFocused } = this.state;

    let EText = 'INVALID ' + label
    if(errorText.length > 0) EText = errorText 

    const inputStyle = {
      borderBottomColor: theme.colors.lightgray,
      borderBottomWidth: 1,
      color: theme.colors.black,
      fontSize: value.length > 0 ? theme.FONT_SIZE_LARGE : theme.FONT_SIZE_SMALL,
      height: dySize(40),
      fontFamily: value.length > 0 ? 'LibreBaskerville-Italic' : 'Montserrat-Regular'
    }

    return (
      <View style={styles.container}>
        <Text style={styles.labelText}>{(value.length > 0 || isFocused) ? label : ''}</Text>
        <View style={styles.inputView}>
          <TextInput 
            placeholderTextColor={theme.colors.lightgray}
            placeholder={isFocused ? '' : label}
            underlineColorAndroid='transparent'
            style={inputStyle}
            onChangeText={(text) => this.props.onChange(text)}
            value={value}
            onFocus={() => this.setState({isFocused: true})}
            onBlur={() => null}
            secureTextEntry={isSecure}
            autoCapitalize={capitalize}
            keyboardType={keyboardType}
            editable={editable}
            maxLength={maxLength}
          />
          {
            children !== undefined &&
            <View style={styles.iconView}>
              {children}
            </View>
          }
        </View>
        {
          (isFocused && value.length === 0 && isRequired) ?
          <Text style={styles.errorText}>THIS FIELD IS REQUIRED</Text>
          :isError ?
          <Text style={styles.errorText}>{EText}</Text>
          :null
        }        
      </View>
      
    );
  }
}

export default ValidationInput;

