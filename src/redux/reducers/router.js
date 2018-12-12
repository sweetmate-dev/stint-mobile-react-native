import * as types from '../actions/types';

const INITIAL_STATE = {
  appState: '',
  routeName: '',
  isLoading: false,
}

const route = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case types.WELCOME:
      return {
        ...state,
        appState: 'working...'
      }
    case types.SET_ROUTE_NAME:
      return {
        ...state,
        routeName: action.payload
      }
    case types.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }
    default:
      return state;
  }
}

export default route;
