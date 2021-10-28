import { Post } from './post';

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
  readonly subscriptions: Array<{
    readonly login: string;
    readonly avatar: string;
  }>;
  readonly subscribers: Array<{
    readonly login: string;
    readonly avatar: string;
  }>;
  readonly recommended: Array<{
    readonly login: string;
    readonly avatar: string;
  }>;
}
