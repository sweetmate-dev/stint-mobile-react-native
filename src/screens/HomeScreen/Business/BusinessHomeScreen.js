import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

class BusinessHomeScreen extends Component {
  render() {
    return (
            <View style={styles.container}>
                <Text>BusinessHomeScreen</Text>
            </View>
    );
  }
}
export default BusinessHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
