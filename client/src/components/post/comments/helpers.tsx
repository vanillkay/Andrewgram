import { PostComment as PostCommentType } from 'types/post';

import { PostComment } from './comment';

export const mapComments = (
  comments: Array<PostCommentType>,
  className: string
): JSX.Element[] =>
  comments
    .slice(1)
    .map((comment) => (
      <PostComment key={comment._id} comment={comment} className={className} />
    ));
