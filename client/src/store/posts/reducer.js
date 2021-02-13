import * as postsActionTypes from './types';


const initialState = {
    posts: [],
    userPosts: [],
    isLoadingAllPosts: false,
    isLoadedUserPosts: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case postsActionTypes.TOGGLE_LIKE_POST: {

            const {id, likeOwner} = action.payload;

            const neededPost = state.posts.find(item => +item.id === +id);

            const isInLikes = neededPost.likesAmount.findIndex(item => item.owner.toString() === likeOwner.toString());
            if (isInLikes !== -1) {
                neededPost.likesAmount.splice(isInLikes, 1);
            } else {
                neededPost.likesAmount.push({owner: likeOwner})
            }
            neededPost.isLiked = !neededPost.isLiked;
            return {...state, posts: [...state.posts]};
        }
        case postsActionTypes.WRITE_NEW_COMMENT: {
            const {postId, comment} = action.payload;
            const neededPost = state.posts.find(item => +item.id === +postId);
            neededPost.comments.push(comment)
            return {...state, posts: [...state.posts]}
        }
        case postsActionTypes.SET_USER_POSTS: {
            return {...state, userPosts: action.payload, isLoadedUserPosts: true}
        }
        case postsActionTypes.ADD_USER_POST: {
            state.userPosts.push(action.payload)
            return {...state, userPosts: [...state.userPosts]}
        }
    }
    return state;
}

export default reducer;