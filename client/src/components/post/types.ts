import { Dispatch, SetStateAction } from 'react';

import { Post } from 'types/post';

export interface PostInfoProps {
  setModalInfo: Dispatch<SetStateAction<boolean>>;
  info: Post;
  isUserPost: boolean;
  isLoadingPost: boolean;
}

export type Direction = 'right' | 'left' | 'up' | 'down' | undefined;
