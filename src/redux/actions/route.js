import * as types from './types';


export const setRouteName = (name) => ({
  type: types.SET_ROUTE_NAME,
  payload: name,
})

export const setLoading = (status) => ({
  type: types.SET_LOADING,
  payload: status,
})

