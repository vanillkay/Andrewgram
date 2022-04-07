import { Post } from 'types/post';

export interface PostsState {
  posts: Post[];
  userPosts: Post[];
  isLoadingAllPosts: boolean;
  isLoadedUserPosts: boolean;
  isLikedPost: boolean;
  isCommentPost: boolean;
}
