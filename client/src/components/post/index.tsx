import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  makeStyles,
  Slide,
  Theme,
} from '@material-ui/core';
import 'moment/locale/ru';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Skeleton } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';

import {
  toggleLoadingLike,
  toggleLoadingPost,
  writeNewComment,
} from 'store/posts/actions';
import PostIcons from './icons';
import PostComments from './comments';
import { useHttp } from 'hooks/http.hook';
import { getUserInfo } from 'store/user/selectors';
import * as postsActions from 'store/posts/actions';
import { Likes } from 'components/post/likes';
import { NewComment } from 'components/post/new-comment';
import { PostInfoProps } from './types';

moment.locale('ru');

const useStyles = makeStyles<Theme, { isModal: boolean }>(() => ({
  post: {
    width: '100%',
    marginBottom: (props) => (props.isModal ? '' : '2rem'),
    border: '1px solid rgb(219, 219, 219)',
    borderRadius: '3px',
  },
  post__profile__name: {
    fontWeight: 'bold',
    textDecoration: 'none',
    color: 'inherit',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  media: {
    minHeight: '60vh',
    maxHeight: '60vh',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& img': {
      width: '100%',
      height: '100%',
    },
  },
  'post-info': {
    margin: '1rem 0 0 1rem',
    '& a': {
      textDecoration: 'none',
      color: 'inherit',
      fontWeight: 'bold',
      marginRight: '.3rem',
    },
  },
  'post-line': {
    height: '3px',
    margin: '1rem 0 1rem 1rem',
    backgroundColor: 'rgb(219, 219, 219)',
  },
}));

const Post = ({
  setModalInfo,
  info,
  isUserPost = false,
  loadingPost = false,
}: PostInfoProps) => {
  const {
    isLiked,
    created,
    id,
    imgSrc,
    likes,
    text,
    comments,
    ownerLogin,
    avatar = '',
  } = info;

  const [isComment, setIsComment] = useState(false);

  const [animationSide, setAnimationSide] = useState('right');

  const classes = useStyles({ isModal: !!setModalInfo });

  const dispatch = useDispatch();

  const user = useSelector(getUserInfo);

  const { request } = useHttp();

  const toggleLike = () => {
    dispatch(toggleLoadingLike());
    request('/post/like', 'post', { id, likerLogin: user.login })
      .then(() => {
        if (isUserPost)
          setModalInfo((prevState) => ({
            ...prevState,
            isLiked: !prevState.isLiked,
          }));
        dispatch(postsActions.toggleLike(id, user.login, isUserPost));
      })
      .finally(() => dispatch(toggleLoadingLike()));
  };

  const loadComment = (comment) => {
    dispatch(toggleLoadingPost());
    request('/post/comment', 'post', { id, owner: user.login, comment })
      .then((res) => {
        dispatch(writeNewComment(isUserPost, id, { ...res.comment }));
        setAnimationSide('left');
        setIsComment(false);
        setTimeout(() => {
          setAnimationSide('right');
        }, 500);
      })
      .finally(() => dispatch(toggleLoadingPost()));
  };

  const date = moment.parseZone(created).calendar();

  const toggleLikePost = (e) => {
    const targetData = e.target.dataset;
    if (targetData.type === 'post' && targetData.info) {
      toggleLike();
    }
  };

  useEffect(() => {
    if (isUserPost) {
      document.addEventListener('dblclick', toggleLikePost);
      return () => {
        document.removeEventListener('dblclick', toggleLikePost);
      };
    }
  }, []);

  return (
    <Card className={classes.post}>
      <CardHeader
        avatar={
          loadingPost ? (
            <Skeleton
              animation="wave"
              variant="circle"
              width={40}
              height={40}
            />
          ) : (
            <Avatar alt={text} src={`/${avatar}`} />
          )
        }
        title={
          loadingPost ? (
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          ) : (
            <Link
              className={classes.post__profile__name}
              to={`/profile/${ownerLogin}`}
            >
              {ownerLogin}
            </Link>
          )
        }
        subheader={
          loadingPost ? (
            <Skeleton animation="wave" height={10} width="40%" />
          ) : (
            date
          )
        }
      />
      {loadingPost ? (
        <Skeleton animation="wave" variant="rect" className={classes.media} />
      ) : (
        <div className={classes.media}>
          <CardMedia
            component="img"
            src={`/${imgSrc}`}
            data-type="post"
            data-info={id}
          />
        </div>
      )}

      <CardContent>
        {loadingPost ? (
          <>
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="80%" />
          </>
        ) : (
          <>
            <PostIcons
              isComment={isComment}
              isLiked={isLiked}
              toggleLike={toggleLike}
              toggleComment={() => setIsComment((prevState) => !prevState)}
            />
            <Likes likes={likes} />
            {text && text.length !== 0 && (
              <div className={classes['post-info']}>
                <Link
                  to={{
                    pathname: `/profile/${ownerLogin}`,
                    state: {
                      fromNotifications: false,
                    },
                  }}
                >
                  {ownerLogin}
                </Link>
                {text}
              </div>
            )}
            <div className={classes['post-line']} />
            <PostComments comments={comments} />
            <Slide
              in={isComment}
              direction={animationSide}
              mountOnEnter
              unmountOnExit
            >
              <NewComment
                avatar={user.avatar}
                login={ownerLogin}
                loadComment={loadComment}
              />
            </Slide>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export { Post };
