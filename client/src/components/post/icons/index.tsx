import { useSelector } from 'react-redux';
import { IconButton } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';

import {
  getPostCommentLoading,
  getPostLikeLoading,
} from 'store/posts/selectors';
import { useStyles } from './styles';
import { PostIconsProps } from './types';

const PostIcons = ({
  isLiked,
  isComment,
  toggleLike,
  toggleComment,
}: PostIconsProps) => {
  const isLikeLoading = useSelector(getPostLikeLoading);

  const isComLoading = useSelector(getPostCommentLoading);

  const classes = useStyles();
  return (
    <>
      <IconButton
        disabled={isLikeLoading}
        onClick={toggleLike}
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
