import { Post } from 'types/post';
import { RootState } from '../root/types';

export const getPosts = (store: RootState): Post[] => store.posts.posts;
export const getAllPostsLoading = ({ posts }) => posts.isLoadingAllPosts;
export const getUserPosts = ({ posts }) => posts.userPosts;
export const getUserPostsLoaded = ({ posts }) => posts.isLoadedUserPosts;
export const getPostLikeLoading = ({ posts }) => posts.isLikedPost;
export const getPostCommentLoading = ({ posts }) => posts.isCommentPost;
