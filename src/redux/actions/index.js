
import * as routeActions from './route';
import * as homeActions from './home';
import * as tempActions from './temp';
import * as postActions from './post';
import * as userActions from './user';

export const ActionCreators = Object.assign(
  {},
  homeActions,
  routeActions,
  tempActions,
  postActions,
  userActions
);
