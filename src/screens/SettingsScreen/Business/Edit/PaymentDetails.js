

/* jshint esversion: 6 *//* jshint node: true */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import { SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../../redux/actions';
import NavigationService from '../../../../navigation/NavigationService';
import ScreenHeader from '../../../../components/Navigation/ScreenHeader';
import SearchInput from '../../../../components/Input/SearchInput';
import { dySize } from '../../../../utils/responsive';
import theme from '../../../../theme';
import { Icon } from 'native-base';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  sectionView: {
    height: dySize(40),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightgray
  },
  sectionText: {
    fontSize: theme.FONT_SIZE_SMALL,
    fontFamily: 'Montserrat-Regular'
  },
  listItemView: {
    height: dySize(60),
    paddingHorizontal: dySize(20),
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightgray,
    backgroundColor: theme.colors.white
  },
  listItemText: {
    fontSize: theme.FONT_SIZE_MEDIUM,
    fontFamily: 'Montserrat-Regular'
  },
  closeButtonView: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: dySize(60),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.red
  },
  closeIcon: {
    fontSize: theme.FONT_SIZE_MEDIUM,
    color: theme.colors.white
  },
  rightIcon: {
    fontSize: theme.FONT_SIZE_MEDIUM,
    color: theme.colors.black
  },
  addCardButtonView: {
    height: dySize(60),
    paddingHorizontal: dySize(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightgray,
    backgroundColor: theme.colors.white
  },
  bottomView: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    padding: dySize(20)
  },
  bottomText: {
    fontSize: theme.FONT_SIZE_MEDIUM,
    fontFamily: 'LibreBaskerville-Regular',
    lineHeight: dySize(24),
    color: theme.colors.gray
  },
  cardItemView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

class PaymentDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCard: {}
    };
  }

  componentDidMount() {
    const { post: { selectedCard }} = this.props;
    this.setState({selectedCard})
  }

  gotoAddCard = () => {
    NavigationService.navigate('PaymentDetailsAddCard')
  }

  render() {
    const { selectedCard } = this.state;
    const { post } = this.props;
    return (
      <View style={styles.container}>
        <ScreenHeader
          backgroundColor={theme.colors.white}
          title="PAYMENT DETAILS"
          leftIcon="md-arrow-back"
          rightText="DONE"
          onPressLeft={() => NavigationService.goBack()}
          onPressRight={this.onConfirmCard}
          textColor={theme.colors.black}
          borderBottomWidth={1}
        />
        <View style={styles.sectionView}>
          <Text style={styles.sectionText}>PAYMENT DETAILS</Text>
        </View>
        <View style={styles.listItemView}>
          <Text style={styles.listItemText}>DIRECT DEBIT</Text>
        </View>
        {
          post.paymentCards.debit.map((card, index) => (
            <SwipeRow
              ref={(ref) => this.swipe = ref}
              disableLeftSwipe
              leftOpenValue={dySize(60)}
              key={card.name}
            >
              <View style={styles.closeButtonView}>
                <TouchableOpacity onPress={() => this.onRemoveCard(card)}>
                    <Icon name="md-close" style={styles.closeIcon} />
                </TouchableOpacity>
              </View>            
              <View style={styles.listItemView}>
                <TouchableOpacity onPress={() => this.onSelectCard(card)}>
                  <View style={styles.cardItemView}>
                    <Text style={styles.listItemText}>{card.name}</Text>
                    {selectedCard.name === card.name && <Icon name="md-checkmark" style={styles.rightIcon} />}
                  </View>                  
                </TouchableOpacity>                
              </View>
            </SwipeRow>
          ))
        }
        <TouchableOpacity onPress={this.gotoAddCard}>
          <View style={styles.addCardButtonView}>
            <Text style={styles.listItemText}>ADD DEBIT OR CREDIT CARD</Text>
            <Icon name="ios-arrow-forward" style={styles.rightIcon} />
          </View>
        </TouchableOpacity>
        <View style={styles.bottomView}>
          <Text style={styles.bottomText}>If you have any questions with regards to how payment works, please get in touch with Stint HQ.</Text>
        </View>
      </View>
    );
  }

  onRemoveCard = (card) => {
    alert('comming soon')
  }

  onSelectCard = (card) => {
    this.setState({selectedCard: card})     
  }

  onConfirmCard = () => {
    this.props.setPaymentCard(this.state.selectedCard)
    NavigationService.goBack()   
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(state => ({
  post: state.post,
}), mapDispatchToProps)(PaymentDetailScreen);


