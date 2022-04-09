import { Post } from './post';

export interface UserShortInfo {
  readonly _id: string;
  readonly login: string;
  readonly avatar: string;
}

export interface User {
  readonly login: string;
  readonly resetToken: string;
  readonly resetTokenExp: Date;
  readonly email: string;
  readonly name: string;
  readonly password: string;
  readonly avatar: string;
  readonly posts: {
    readonly items: Array<Post>;
  };
  readonly subscriptions: Array<UserShortInfo>;
  readonly subscribers: Array<UserShortInfo>;
  readonly recommended: Array<UserShortInfo>;
}

export interface UserToken {
  token: string;
}
