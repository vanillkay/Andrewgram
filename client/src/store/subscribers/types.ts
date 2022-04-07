import { User } from 'types/user';

export interface SubscribersState {
  subscription: User[];
  recommended: User[];
  isLoading: boolean;
}
