import { UserState } from 'store/user/types';
import { PostsState } from 'store/posts/types';
import { SubscribersState } from 'store/subscribers/types';

export interface RootState {
  posts: PostsState;
  subscribers: SubscribersState;
  user: UserState;
}
