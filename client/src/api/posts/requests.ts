import { client } from '../index';
import { LikePost, LoadPosts } from './types';
import { Post } from '../../types/post';

export const loadPosts = ({ login, count }: LoadPosts): Promise<Post[]> =>
  client
    .post('/posts/all', {
      login,
      length: count,
    })
    .then(({ data }) => data);

export const likePost = ({ id, likerLogin }: LikePost): Promise<void> =>
  client.post('/posts/like', { id, likerLogin }).then(({ data }) => data);
