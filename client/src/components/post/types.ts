import { Post } from 'types/post';

export interface PostInfoProps {
  info: Post;
}

export type Direction = 'right' | 'left' | 'up' | 'down' | undefined;
