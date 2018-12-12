import * as types from './types';

//title, location, date
export const updatePostStintData = (data) => ({
  type: types.SET_POST_STINT_DATA,
  payload: data,
})
//instruction and uniform
export const savePostStintInfo = (data) => ({
  type: types.SET_POST_STINT_INFO,
  payload: data,
})

export const setPaymentCard = (card) => ({
  type: types.SET_PAYMENT_CARD,
  payload: card
})