import { FC } from 'react';
import isEmpty from 'lodash/isEmpty';
import { Button, Collapse } from '@material-ui/core';

import { useStyles } from './styles';
import { CommentsProps } from './types';
import { mapComments } from './helpers';
import { useToggle } from 'hooks/useToggle';
import { PostComment } from './comment';

const PostComments: FC<CommentsProps> = ({ comments }) => {
  const [isAllComments, toggleAllComments] = useToggle();

  const classes = useStyles();

  if (isEmpty(comments)) {
    return (
      <div className={classes.comments}>
        <p className={classes.comment}>
          <span>Комментариев нету</span>
        </p>
      </div>
    );
  }

  const firstComment = comments[0];

  const allCommentsBtnText = isAllComments
    ? 'Скрыть'
    : `Показать больше (${comments.length - 1})`;

  return (
    <div className={classes.comments}>
      <PostComment comment={firstComment} className={classes.comment} />
      {comments.length > 1 && (
        <>
          <Collapse mountOnEnter unmountOnExit in={isAllComments}>
            {mapComments(comments, classes.comment)}
          </Collapse>
          <Button
            disableRipple
            onClick={toggleAllComments}
            className={classes['show-all-comment-btn']}
          >
            {allCommentsBtnText}
          </Button>
        </>
      )}
    </div>
  );
};

export { PostComments };
