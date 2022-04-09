export interface LoadPosts {
  login: string;
  count: number;
}

export interface LikePost {
  id: string;
  likerLogin: string;
}

export interface PublishComment {
  id: string;
  owner: string;
  comment: string;
}
