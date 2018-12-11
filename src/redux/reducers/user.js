import * as types from '../actions/types';

const INITIAL_STATE = {
  type: 'business',
  username: 'Stint',  
  personal: {
    first_name: 'Asif busin',
    last_name: 'Business',
    email: 'business@business.com',
    mobile: '0754646464',
    photo: null,
  },
  business: {
    name: 'The Good Egg',
    address: 'Unit 9, Kingly Court',
    city: 'London',
    code: 'W1B 5PW',
    country: 'UK',
    mobile: '07968029524',
    photo: null
  },
  team_members: [
    {
      username: '1',
      name: 'JOHN DOE',
      image: null,
    },
    {
      username: '2',
      name: 'MIKE ETTLINGER',
      image: null,
    },
    {
      username: '3',
      name: 'CODY KOCIEMBA',
      image: null,
    }
  ],
  completedProfile: {
    photo: true,
    payment: true,
    mobile: true,
  },
  hasBusiness: {
    logo: false,
    detail: false,
    payment: false
  },
  country: 'UK',
  myStints: [
    {
      id: 1,
      title: 'Bar Back',
      location: 'Paris Garden, South Bank, London SE1, UK',
      from: '16:00',
      to: '17:00',
      instruction: 'Placeholder',
      uniform: 'test',
      date: '2018-10-27'
    },
    {
      id: 1,
      title: 'Cloakroom',
      location: 'Paris Garden, South Bank, London SE1, UK',
      from: '16:00',
      to: '17:00',
      instruction: 'Placeholder',
      uniform: 'test',
      date: '2018-10-29'
    },
    {
      id: 1,
      title: 'Cleaning',
      location: 'Paris Garden, South Bank, London SE1, UK',
      from: '20:00',
      to: '22:00',
      instruction: 'Placeholder',
      uniform: 'test',
      date: '2018-10-29'
    }
  ]
}

const user = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case types.SET_USER_INFO:
      return {
        ...state,
        type: action.userType,
        username: actions.username
      }
    case types.UPDATE_COMPLETED_PROFILE_STATE:
      return {
        ...state,
        completedProfile: {
          ...state.completedProfile,
          ...action.payload
        }
      }
    case types.UPDATE_COMPLETED_BUSINESS_STATE:
      return {
        ...state,
        hasBusiness: {
          ...state.hasBusiness,
          ...action.payload
        }
      }
    case types.SET_BUSINESS_COUNTRY_CODE:
      return {
        ...state,
        country: action.payload,
        business: {
          ...state.business,
          country: action.payload,
        }
      }
    default:
      return state;
  }
}

export default user;
