import { Skeleton } from '@material-ui/lab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';

import { useStyles } from './styles';

// @ts-ignore
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
