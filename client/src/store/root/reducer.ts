import { combineReducers } from '@reduxjs/toolkit';

import { userReducer } from 'store/user/slice';
import { postsReducer } from 'store/posts/slice';
import { subscribersReducer } from 'store/subscribers/slice';

const rootReducer = combineReducers({
  posts: postsReducer,
  subscribers: subscribersReducer,
  user: userReducer,
});

export { rootReducer };
