import { client } from 'api';
import { Post } from 'types/post';

import { LikePost, LoadPosts, PublishComment } from './types';

export const loadPosts = ({ login, count }: LoadPosts): Promise<Post[]> =>
  client
    .post('/posts/all', {
      login,
      length: count,
    })
    .then(({ data }) => data);

export const likePost = ({ id, likerLogin }: LikePost): Promise<void> =>
  client.post('/posts/like', { id, likerLogin }).then(({ data }) => data);

export const publishPostComment = (values: PublishComment): Promise<void> =>
  client.post('/post/comment', values).then(({ data }) => data);
