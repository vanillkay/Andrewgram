export interface Post {
  readonly id: string;
  readonly imageSrc: string;
  readonly info: string;
  readonly created: Date;
  readonly ownerLogin: string;
  readonly comments: Array<PostComment>;
  readonly likes: Array<PostLikes>;
}

export interface PostComment {
  readonly _id: string;
  readonly owner: string;
  readonly text: string;
}

export interface PostLikes {
  readonly owner: string;
}
