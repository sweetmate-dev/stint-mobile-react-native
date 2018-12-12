import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Image } from 'react-native';
import PropTypes from 'prop-types';
import theme from '../../theme';
import { dySize } from '../../utils/responsive';

const searchIcon = require('../../assets/images/ui/loupe-dark.png');

const styles = StyleSheet.create({
  container: {
    height: dySize(60),
    flexDirection: 'row',
    padding: dySize(15),
    alignItems: 'center',
    backgroundColor: theme.colors.white
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: dySize(15)
  },
  input: {
    flex: 1,
    height: dySize(60),
    justifyContent: 'center',
    fontSize: theme.FONT_SIZE_MEDIUM,
    fontFamily: 'Montserrat-Regular'
  }
})

class SearchInput extends Component {
  
  constructor(props) {
    super(props);
    this.state = {

    };
  }
    
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    keyboardType: PropTypes.string
  }

  static defaultProps = {
    keyboardType: 'default'
  }

  render() {
    const { 
      placeholder,
      value,
      keyboardType
    } = this.props;

    return (
      <View style={styles.container}>
        <Image source={searchIcon} style={styles.icon} />
        <TextInput 
          placeholder={placeholder}
          underlineColorAndroid='transparent'
          style={styles.input}
          onChangeText={(text) => this.props.onChange(text)}
          value={value}
          keyboardType={keyboardType}
          maxLength={40}
        />
      </View>
      
    );
  }
}

export default SearchInput;

