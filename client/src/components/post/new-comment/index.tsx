import {
  Grid,
  Input,
  Avatar,
  Button,
  FormControl,
  InputAdornment,
  CircularProgress,
} from '@material-ui/core';
import React, { ForwardedRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getPostCommentLoading } from 'store/posts/selectors';
import { useStyles } from './styles';
import { NewCommentProps } from './types';

const NewComment = React.forwardRef(
  (
    { loadComment, avatar }: NewCommentProps,
    forwardRef: ForwardedRef<HTMLDivElement>
  ) => {
    const [comment, setComment] = useState('');

    const [isError, setIsError] = useState(false);

    const handleCommentInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isError) setIsError(false);
      setComment(e.target.value);
    };

    const addComment = () => {
      if (!comment.length) {
        setIsError(true);
        return;
      }
      loadComment(comment);
    };

    const isComLoading = useSelector(getPostCommentLoading);

    const classes = useStyles();
    return (
      <div className={classes['new-comment']} ref={forwardRef}>
        <Grid
          container
          className={classes['new-comment-field']}
          spacing={1}
          alignItems="flex-end"
        >
          <Grid item>
            <Avatar alt="Avatar" src={'/' + avatar} />
          </Grid>
          <Grid className={classes['new-comment-input']} item>
            <FormControl fullWidth variant="outlined">
              <Input
                disabled={isComLoading}
                //TODO FIx problems with theme
                // @ts-ignore
                variant="outlined"
                value={comment}
                onChange={handleCommentInput}
                multiline
                style={{ width: '100%' }}
                id="filled-adornment-password"
                placeholder=""
                endAdornment={
                  <InputAdornment position="end">
                    <Button
                      disabled={isComLoading}
                      onClick={addComment}
                      className={classes['comment-btn']}
                      disableRipple
                    >
                      Опубликовать
                    </Button>
                  </InputAdornment>
                }
              />
            </FormControl>
            {isError && (
              <div className={classes['comment-error']}>
                Введите сначала комментарий
              </div>
            )}
          </Grid>
          <Grid item />
        </Grid>
        {isComLoading && (
          <div className={classes['new-comment-loader']}>
            <CircularProgress />
          </div>
        )}
      </div>
    );
  }
);

export { NewComment };
