import * as types from '../actions/types';

const INITIAL_STATE = {
  signUpUser: {
    university: {
      name: 'BIRKBECK UNIVERSITY LONDON',
      url: 'birkbeck.ac.uk'
    },
    firstName: '',
    lastName: '',
    mobilePhone: '',
    email: '',
    password: ''
  },
  university_list: [
    {
      name: 'BIRKBECK UNIVERSITY LONDON',
      url: 'birkbeck.ac.uk'
    },
    {
      name: 'BRUNEL UNIVERSITY',
      url: 'brunel.ac.uk'
    },
    {
      name: 'CITY, UNIVERSITY OF LONDON',
      url: 'city.ac.uk'
    }
  ],
  termsHTML: '',
  PrivacyHTML: ''
}

const temp = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case types.SET_SIGNUP_USER_UNIVERSITY:
      return {
        ...state,
        signUpUser: {university: action.payload}
      }
    case types.SET_SIGNUP_USER_EMAIL:
      return {
        ...state,
        signUpUser: {
          ...state.signUpUser,
          email: action.payload
        }
      }
    case types.SET_SIGNUP_USER:
      return {
        ...state,
        signUpUser: {
          ...state.signUpUser,
          ...action.payload
        }
      }
    case types.SET_TERMS_HTML:
      return {
        ...state,
        termsHTML: action.payload
      }
    default:
      return state;
  }
}

export default temp;
