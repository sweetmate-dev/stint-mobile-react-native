import * as types from './types';

export const setUniversity = (university) => ({
  type: types.SET_SIGNUP_USER_UNIVERSITY,
  payload: university
});

export const setSignUpUserEmail = (email) => ({
  type: types.SET_SIGNUP_USER_EMAIL,
  payload: email
});

export const setSignUpUser = (user) => ({
  type: types.SET_SIGNUP_USER,
  payload: user
});

export const setTermsHTML = (html) => ({
  type: types.SET_TERMS_HTML,
  payload: html
})

export const loadTermsAndConditions = () => {
  return dispatch => {
    const url = 'https://api.fakecallerid.io/terms';
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/x-www-form-urlencoded',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then((terms) => terms.json())
    .then((termsJson) => {
      dispatch(setTermsHTML(termsJson.terms))
    })
    .catch((e) => {
      console.log(e.toString());
    });
  }
}


