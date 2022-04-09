import { Post } from 'types/post';
import { RootState } from 'store/root/types';

export const getPosts = (store: RootState): Post[] => store.posts.posts;

export const getAllPostsLoading = (store: RootState) =>
  store.posts.isLoadingAllPosts;

export const getUserPosts = (store: RootState) => store.posts.userPosts;

export const getUserPostsLoaded = (store: RootState) =>
  store.posts.isLoadedUserPosts;

export const getPostLikeLoading = (store: RootState) => store.posts.isLikedPost;

export const getPostCommentLoading = (store: RootState) =>
  store.posts.isCommentPost;
