import * as types from './types';
import NavigationService from '../../navigation/NavigationService';

export const updateCompleteProfileState = (data, callback) => (dispatch, getState) => {
  const profileState = getState().user.completedProfile;
  const updatedProfileState = {
    ...profileState,
    ...data,
  }
  dispatch(setCompleteProfileState(data))
  if(
    updatedProfileState.photo && 
    updatedProfileState.payment && 
    updatedProfileState.mobile
  ) {    
    NavigationService.navigate('CompletedProfile');
  } else {
    NavigationService.goBack()
  }  
};

export const updateCompleteBusinessState = (data, callback) => (dispatch, getState) => {
  const businessState = getState().user.hasBusiness;
  const updatedBusinessState = {
    ...businessState,
    ...data,
  }
  dispatch(setCompleteBusinessState(data))
  if(
    updatedBusinessState.logo && 
    updatedBusinessState.detail && 
    updatedBusinessState.payment
  ) {    
    NavigationService.navigate('CompletedBusiness');
  } else {
    NavigationService.goBack()
  }  
};

export const setCompleteProfileState = (data) => ({
  type: types.UPDATE_COMPLETED_PROFILE_STATE,
  payload: data
})

export const setCompleteBusinessState = (data) => ({
  type: types.UPDATE_COMPLETED_BUSINESS_STATE,
  payload: data
})

export const setBusinessCountry = (country) => ({
  type: types.SET_BUSINESS_COUNTRY_CODE,
  payload: country
})
