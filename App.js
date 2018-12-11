import React from 'react';
import { YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import AppWithNav from './src/navigation/AppWithNav';
import store from './src/redux/store'

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
console.disableYellowBox = true;

export default class App extends React.Component {
  render() {
    return <Provider store={store}><AppWithNav /></Provider>;
  }
}
