import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Collapse } from '@material-ui/core';

import { useStyles } from './styles';
import { CommentsProps } from './types';
import { mapComments } from './helpers';

const PostComments = ({ comments }: CommentsProps) => {
  const [isAllComments, setIsAllComments] = useState<boolean>(false);

  const classes = useStyles();

  return (
    <div className={classes.comments}>
      {comments.length > 1 ? (
        <>
          <p className={classes.comment}>
            <Link to={'/profile/' + comments[0].owner}>
              {comments[0].owner}
            </Link>
            <span>{comments[0].text}</span>
          </p>
          <Collapse mountOnEnter unmountOnExit in={isAllComments}>
            {mapComments(comments, classes.comment)}
          </Collapse>
          <Button
            disableRipple
            className={classes['show-all-comment-btn']}
            onClick={() => setIsAllComments((prevState) => !prevState)}
          >
            {isAllComments
              ? 'Скрыть'
              : `Показать больше (${comments.length - 1})`}
          </Button>
        </>
      ) : comments.length ? (
        <p className={classes.comment}>
          <Link to={'/profile/' + comments[0].owner}>{comments[0].owner}</Link>
          <span>{comments[0].text}</span>
        </p>
      ) : (
        <p className={classes.comment}>
          <span>Комментариев нету</span>
        </p>
      )}
    </div>
  );
};

export default PostComments;
