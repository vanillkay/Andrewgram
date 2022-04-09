import { User } from 'types/user';

export interface UserState {
  isAuth: boolean;
  isLoadingInfo: boolean;
  user: User | null;
  visitedUserInfo: {
    subscriptions: User[];
    subscribers: User[];
  };
}
