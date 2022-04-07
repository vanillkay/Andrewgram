import { FC } from 'react';
import { useSelector } from 'react-redux';
import { IconButton } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';

import {
  getPostLikeLoading,
  getPostCommentLoading,
} from 'store/posts/selectors';
import { useStyles } from './styles';
import { PostIconsProps } from './types';

const PostIcons: FC<PostIconsProps> = ({
  isLiked,
  isComment,
  toggleLike,
  toggleComment,
}) => {
  const isLikeLoading = useSelector(getPostLikeLoading);

  const isComLoading = useSelector(getPostCommentLoading);

  const classes = useStyles();

  return (
    <>
      <IconButton
        onClick={toggleLike}
        disabled={isLikeLoading}
        aria-label="add to favorites"
      >
        {isLiked ? (
          <FavoriteIcon className={classes['like-active']} />
        ) : (
          <FavoriteBorderOutlinedIcon className={classes.like} />
        )}
      </IconButton>
      <IconButton
        disabled={isComLoading}
        onClick={toggleComment}
        aria-label="add comment"
      >
        {isComment ? (
          <ChatBubbleIcon color={'action'} />
        ) : (
          <ChatBubbleOutlineOutlinedIcon />
        )}
      </IconButton>
    </>
  );
};

export { PostIcons };
