import * as postsActionTypes from './actionTypes';

export const toggleLike = (id, likeOwner, isUserPost) => ({
  type: postsActionTypes.TOGGLE_LIKE_POST,
  payload: { id, likeOwner, isUserPost },
});

export const writeNewComment = (isUserPost, postId, comment) => ({
  type: postsActionTypes.WRITE_NEW_COMMENT,
  payload: { isUserPost, postId, comment },
});

export const setUserPosts = (posts, login) => ({
  type: postsActionTypes.SET_USER_POSTS,
  payload: { posts, login },
});

export const addUserPost = (post) => ({
  type: postsActionTypes.ADD_USER_POST,
  payload: post,
});

export const toggleLoadingLike = () => ({
  type: postsActionTypes.TOGGLE_LIKE_POST_LOADING,
});

export const toggleLoadingPost = () => ({
  type: postsActionTypes.TOGGLE_COMMENT_POST_LOADING,
});

export const toggleAllPostsLoading = () => ({
  type: postsActionTypes.TOGGLE_ALL_POST_LOADING,
});

export const setAllPosts = (posts, login) => ({
  type: postsActionTypes.SET_ALL_POSTS,
  payload: { posts, login },
});
