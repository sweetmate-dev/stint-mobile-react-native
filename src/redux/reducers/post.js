import * as types from '../actions/types';

const INITIAL_STATE = {
  post: {
    title: 'Errands',
    location: 'Park Lane, London, UK',
    startDate: '',
    endDate: '',
    repeatDays: [0, 2, 4],//offset days
    numberOfStudent: 1
  },
  instruction: '',
  uniform: '',
  paymentCards: {
    debit: [
      {
        category: 'debit',
        name: 'CARD *3959',
      },
      {
        category: 'debit',
        name: 'CARD *4781',
      }
    ],
    credit: []
  },
  selectedCard: {}
}

const post = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case types.SET_POST_STINT_DATA:
      return {
        ...state,
        post: {
          ...state.post,
          ...action.payload
        }
      }
    case types.SET_PAYMENT_CARD:
      return {
        ...state,
        selectedCard: action.payload
      }
    case types.SET_POST_STINT_INFO:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
}

export default post;