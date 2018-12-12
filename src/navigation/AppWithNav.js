import React from 'react';
import { View, StatusBar } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

import { ActionCreators } from '../redux/actions';
import MainNavigator from './RootNavigation';
import NavigatorService from './NavigationService';

class AppWithNavigationState extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" backgroundColor="black"/>
        <MainNavigator
          ref={(navigatorRef) => {
            NavigatorService.setContainer(navigatorRef);
          }}
          onNavigationStateChange={(prevState, currentState, action) => {
            console.log(action);
            const routeName = currentState.routes[currentState.index].routeName;
            this.props.setRouteName(routeName);
          }}
        />
        <Spinner visible={this.props.isLoading} color='black' />
      </View>
    );
  }
}

const mapStateToProps = state => ({ isLoading: state.router.isLoading });

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppWithNavigationState);
