import { Nullable } from 'types/utils';
import { UserShortInfo } from 'types/user';

export interface SubscribersState {
  subscription: Nullable<UserShortInfo[]>;
  recommended: Nullable<UserShortInfo[]>;
  isLoading: boolean;
}
