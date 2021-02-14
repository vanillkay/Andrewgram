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

            const {id, likeOwner, isUserPost} = action.payload;

            const neededPostsArr = isUserPost ? 'userPosts' : 'posts';

            const neededPost = state[neededPostsArr].find(item => +item.id === +id);

            console.log(neededPost)

            const isInLikes = neededPost.likes.findIndex(item => item.owner.toString() === likeOwner.toString());
            if (isInLikes !== -1) {
                neededPost.likes.splice(isInLikes, 1);
            } else {
                neededPost.likes.push({owner: likeOwner})
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