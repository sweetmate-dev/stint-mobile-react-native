

/* jshint esversion: 6 *//* jshint node: true */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../redux/actions';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import ScreenHeader from '../../components/Navigation/ScreenHeader';



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class LetsDoThisScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    this.props.welcome();
  }

  render() {
    const { navigation } = this.props;


    return (
      <Container>
               <ScreenHeader title="LetsDoThisScreen"   navigation={navigation}/>


        <Content>
          <Text>
          <Text>LetsDoThisScreen</Text>
          </Text>
        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>Footer</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
      
    
    );
  }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ActionCreators, dispatch);
  }
export default connect(state => ({
  appState: state.appState,
}), mapDispatchToProps)(LetsDoThisScreen);

