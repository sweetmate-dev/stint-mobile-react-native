import { takeLatest } from 'redux-saga/effects';
import * as types from '../actions/types';
import * as SagaHome from './home';

function* stintSaga() {
  /*
    Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
    Allows concurrent fetches of user.
  */

  // Home Sagas
  yield takeLatest(types.WELCOME, SagaHome.welcome);
  /*
      Alternatively you may use takeLatest.
      Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
      dispatched while a fetch is already pending, that pending fetch is cancelled
      and only the latest one will be run.
    */
}

export default stintSaga;
