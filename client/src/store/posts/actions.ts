import { createAction } from '@reduxjs/toolkit';

import { PublishComment } from 'api/posts/types';

import * as postsActionTypes from './actionTypes';

export const toggleLikePostAction = createAction<string>(
  postsActionTypes.TOGGLE_LIKE_POST
);

export const loadPostsAction = createAction(postsActionTypes.LOAD_POSTS);

export const publishPostCommentAction = createAction<PublishComment>(
  postsActionTypes.PUBLISH_NEW_COMMENT
);
