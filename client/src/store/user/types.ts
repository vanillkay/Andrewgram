import { User } from 'types/user';

export interface UserState {
  isAuth: boolean;
  isLoadingInfo: boolean;
  userInfo: unknown;
  visitedUserInfo: {
    subscriptions: User[];
    subscribers: User[];
  };
}
