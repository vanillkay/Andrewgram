import * as postsActionTypes from './types';


const initialState = {
    posts: [],
    userPosts: [],
    isLoadingAllPosts: true,
    isLoadedUserPosts: false,
    isLikedPost: false,
    isCommentPost: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case postsActionTypes.TOGGLE_LIKE_POST: {

            const {id, likeOwner, isUserPost = false} = action.payload;

            const neededPostsArr = isUserPost === true ? 'userPosts' : 'posts';

            const neededPost = state[neededPostsArr].find(item => item._id === id);

            const isInLikes = neededPost.likes.findIndex(item => item.owner.toString() === likeOwner.toString());
            if (isInLikes !== -1) {
                neededPost.likes.splice(isInLikes, 1);
            } else {
                neededPost.likes.push({owner: likeOwner})
            }
            neededPost.isLiked = !neededPost.isLiked;
            return {...state, [neededPostsArr]: [...state[neededPostsArr]]};
        }
        case postsActionTypes.TOGGLE_LIKE_POST_LOADING: {
            return {...state, isLikedPost: !state.isLikedPost}
        }
        case postsActionTypes.TOGGLE_COMMENT_POST_LOADING: {
            return {...state, isCommentPost: !state.isCommentPost}
        }

        case postsActionTypes.WRITE_NEW_COMMENT: {
            const {isUserPost = false, postId, comment} = action.payload;

            const neededPostsArr = isUserPost === true ? 'userPosts' : 'posts';

            console.log(postId)
            const neededPost = state[neededPostsArr].find(item => item._id === postId);


            neededPost.comments.push(comment)
            return {...state, posts: [...state.posts]}
        }
        case postsActionTypes.SET_USER_POSTS: {
            const {posts, login} = action.payload;

            const userPosts = posts.map(item => ({...item, isLiked: !!item.likes.find(item => item.owner === login)}));

            return {...state, userPosts, isLoadedUserPosts: true}
        }
        case postsActionTypes.ADD_USER_POST: {
            state.userPosts.push(action.payload)
            return {...state, userPosts: [...state.userPosts]}
        }

    }
    return state;
}

export default reducer;