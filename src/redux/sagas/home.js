import { put } from 'redux-saga/effects';

import * as types from '../actions/types';

export function* welcome(action) {
  try {
    yield put({ type: types.SET_APP_STATE, payload: 'Working...' });
  } catch (e) {
    console.log(e.toString());
  }
}
