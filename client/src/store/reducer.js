import { combineReducers } from 'redux';
import posts from './posts/reducer';
import subscribers from './subscribers/reducer';
import user from './user/reducer';

const rootReducer = combineReducers({
  posts,
  subscribers,
  user,
});

export default rootReducer;
