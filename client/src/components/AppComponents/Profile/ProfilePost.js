import React from 'react';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';

const useStyles = makeStyles(() => ({
  'profile-post': {
    height: '10rem',
    overflowY: 'hidden',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover $profile-post__hover': {
      visibility: 'visible',
    },
  },
  'profile-post__img': {
    width: '100%',
    height: 'auto',
  },
  'profile-post__hover': {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0, .5)',
    color: 'white',
    fontSize: '1.5rem',
    transition: '.3s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    visibility: 'hidden',
  },
  'profile-post__icons-prev': {
    width: '2rem',
    height: '2rem',
    color: 'white',
    display: 'flex',
    marginRight: '3px',
    '&:last-child': {
      marginLeft: '1rem',
    },
  },
  '@media (min-width: 600px)': {
    'profile-post': {
      height: '20rem',
    },
  },
}));

const ProfilePost = (props) => {
  const {
    isLoading = false,
    open,
    isLiked,
    created,
    imgSrc,
    info,
    comments,
    avatar,
    ownerLogin,
    likes,
    id,
  } = props;

  const classes = useStyles();

  return (
    <>
      {isLoading ? (
        <div>
          <Skeleton
            animation="wave"
            variant="rect"
            style={{ width: '100%', height: '20rem' }}
          />
        </div>
      ) : (
        <div
          className={classes['profile-post']}
          onClick={() =>
            open({
              imgSrc,
              created,
              comments,
              avatar,
              text: info,
              ownerLogin,
              likes,
              id,
              isLiked,
            })
          }
        >
          <img
            className={classes['profile-post__img']}
            src={'/' + imgSrc}
            alt="post-image"
          />
          <div className={classes['profile-post__hover']}>
            <FavoriteIcon className={classes['profile-post__icons-prev']} />
            {likes.length}
            <ChatBubbleIcon className={classes['profile-post__icons-prev']} />
            {comments.length}
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePost;
