import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { PostComment as PostCommentType } from 'types/post';

const PostComment: FC<{ comment: PostCommentType; className: string }> = ({
  className,
  comment,
}) => (
  <p className={className}>
    <Link to={'/profile/' + comment.owner}>{comment.owner}</Link>
    <span>{comment.text}</span>
  </p>
);

export { PostComment };
