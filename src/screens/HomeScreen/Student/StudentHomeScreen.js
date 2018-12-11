import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import theme from '../../../theme';

class StudentHomeScreen extends Component {
  render() {
    return (
            <View>
                <Text style={styles.contentStyle}>StudentHomeScreen</Text>
            </View>
    );
  }
}
export default StudentHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentStyle: {
    color: theme.colors.primary,

  },
});
