import { Post } from 'types/post';

export interface PostInfoProps {
  info: Post;
  isUserPost: boolean;
  isLoadingPost: boolean;
}

export type Direction = 'right' | 'left' | 'up' | 'down' | undefined;
