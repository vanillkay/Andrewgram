import { PostsState } from './types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/post';

const postsInitialState: PostsState = {
  posts: [],
  userPosts: [],
  isLoadingAllPosts: false,
  isLoadedUserPosts: false,
  isLikedPost: false,
  isCommentPost: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState: postsInitialState,
  reducers: {
    setAllPosts: (
      state,
      action: PayloadAction<{ posts: Post[]; login: string }>
    ) => {
      const { posts, login } = action.payload;
      state.posts = posts.map((item) => ({
        ...item,
        isLiked: !!item.likes.find((elem) => elem.owner === login),
      }));
    },
    toggleAllPostLoading: (state) => {
      state.isLoadingAllPosts = !state.isLoadingAllPosts;
    },
    toggleLikePost: (
      state,
      action: PayloadAction<{
        id: string;
        isUserPost: boolean;
        likeOwner: string;
      }>
    ) => {
      const { id, likeOwner, isUserPost = false } = action.payload;
      const neededPostsArr = isUserPost ? 'userPosts' : 'posts';
      // @ts-ignore
      const neededPost = state[neededPostsArr].find((item) => item._id === id);

      if (!neededPost) {
        return;
      }
      const isInLikes = neededPost.likes.findIndex(
        (item) => item.owner.toString() === likeOwner.toString()
      );
      if (isInLikes !== -1) {
        neededPost.likes.splice(isInLikes, 1);
      } else {
        neededPost.likes.push({ owner: likeOwner });
      }
      // @ts-ignore
      neededPost.isLiked = !neededPost.isLiked;
      state[neededPostsArr] = [...state[neededPostsArr]];
    },
    toggleLikeLoading: (state) => {
      state.isLikedPost = !state.isLikedPost;
    },
    toggleCommentLoading: (state) => {
      state.isCommentPost = !state.isCommentPost;
    },
    writeNewComment: (
      state,
      action: PayloadAction<{
        isUserPost: boolean;
        postId: string;
        comment: string;
      }>
    ) => {
      const { isUserPost = false, postId, comment } = action.payload;

      const neededPostsArr = isUserPost ? 'userPosts' : 'posts';

      const neededPost = state[neededPostsArr].find(
        // @ts-ignore
        (item) => item._id === postId
      );

      if (!neededPost) {
        return;
      }

      // @ts-ignore
      neededPost.comments.push(comment);
      state[neededPostsArr] = [...state[neededPostsArr]];
    },
    setUserPosts: (
      state,
      action: PayloadAction<{ posts: Post[]; login: string }>
    ) => {
      const { posts, login } = action.payload;

      state.userPosts = posts.map((item) => ({
        ...item,
        isLiked: !!item.likes.find((elem) => elem.owner === login),
      }));
      state.isLoadedUserPosts = true;
    },
    addUserPost: (state, action: PayloadAction<Post>) => {
      state.userPosts = [...state.userPosts, action.payload];
    },
  },
});

const {
  reducer: postsReducer,
  actions: {
    addUserPost,
    setAllPosts,
    setUserPosts,
    toggleLikePost,
    writeNewComment,
    toggleLikeLoading,
    toggleAllPostLoading,
    toggleCommentLoading,
  },
} = postsSlice;

export {
  addUserPost,
  setAllPosts,
  setUserPosts,
  postsReducer,
  toggleLikePost,
  writeNewComment,
  toggleLikeLoading,
  toggleAllPostLoading,
  toggleCommentLoading,
};
