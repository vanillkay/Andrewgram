import * as postsActionTypes from './types';

export const toggleLike = (id, likeOwner) => ({
    type: postsActionTypes.TOGGLE_LIKE_POST,
    payload: {id, likeOwner}
})

export const writeNewComment = (postId, comment) => ({
    type: postsActionTypes.WRITE_NEW_COMMENT,
    payload: {postId, comment}
})