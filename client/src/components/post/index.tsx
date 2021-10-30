import {
  Card,
  Slide,
  Avatar,
  CardMedia,
  CardHeader,
  CardContent,
} from '@material-ui/core';
import 'moment/locale/ru';
import moment from 'moment';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Skeleton } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';

import {
  writeNewComment,
  toggleLoadingLike,
  toggleLoadingPost,
} from 'store/posts/actions';
import { useHttp } from 'hooks/http.hook';
import { Likes } from 'components/post/likes';
import { getUserInfo } from 'store/user/selectors';
import * as postsActions from 'store/posts/actions';
import { NewComment } from 'components/post/new-comment';

import { PostIcons } from './icons';
import { useStyles } from './styles';
import PostComments from './comments';
import { Direction, PostInfoProps } from './types';

moment.locale('ru');

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

  const [isComment, setIsComment] = useState<boolean>(false);

  const [animationSide, setAnimationSide] = useState<Direction>('right');

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

  const loadComment = (comment: string) => {
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

  const toggleLikePost = (e: MouseEvent) => {
    //TODO Fix ts click event interface
    // @ts-ignore
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
              <NewComment avatar={user.avatar} loadComment={loadComment} />
            </Slide>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export { Post };
