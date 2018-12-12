
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger'

import rootSaga from '../sagas';
import * as reducers from '../reducers';

const reducer = combineReducers(reducers)

const logger = createLogger({
  timestamp: true,
});
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, {}, applyMiddleware(logger, thunkMiddleware, sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;