import * as postsActionTypes from './types';

export const toggleLike = (id, likeOwner) => ({
    type: postsActionTypes.TOGGLE_LIKE_POST,
    payload: {id, likeOwner}
})

export const writeNewComment = (postId, comment) => ({
    type: postsActionTypes.WRITE_NEW_COMMENT,
    payload: {postId, comment}
})

export const setUserPost = (posts) => ({
    type: postsActionTypes.SET_USER_POSTS,
    payload: posts
})

export const addUserPost = (post) => ({
    type: postsActionTypes.ADD_USER_POST,
    payload: post
})