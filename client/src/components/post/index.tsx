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
import { Skeleton } from '@material-ui/lab';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  toggleLikePostAction,
  publishPostCommentAction,
} from 'store/posts/actions';
import { Likes } from 'components/post/likes';
import { getUserInfo } from 'store/user/selectors';
import { NewComment } from 'components/post/new-comment';

import { PostIcons } from './icons';
import { useStyles } from './styles';
import { PostComments } from './comments';
import { Direction, PostInfoProps } from './types';

moment.locale('ru');

const Post: FC<PostInfoProps> = ({
  setModalInfo,
  info,
  isUserPost = false,
  isLoadingPost = false,
}) => {
  const {
    // @ts-ignore
    isLiked,
    created,
    // @ts-ignore
    id,
    // @ts-ignore
    imgSrc,
    likes,
    // @ts-ignore
    text,
    comments,
    ownerLogin,
    // @ts-ignore
    avatar = '',
  } = info;

  const [isComment, setIsComment] = useState<boolean>(false);

  const [animationSide, setAnimationSide] = useState<Direction>('right');

  const classes = useStyles({ isModal: !!setModalInfo });

  const dispatch = useDispatch();

  const user = useSelector(getUserInfo);

  const toggleLike = () => {
    dispatch(toggleLikePostAction(id));
    // if (isUserPost)
    //   setModalInfo((prevState) => ({
    //     ...prevState,
    //     isLiked: !prevState.isLiked,
    //   }));
  };

  const loadComment = (comment: string) => {
    dispatch(publishPostCommentAction({ id, owner: user.login, comment }));
    // setAnimationSide('left');
    // setIsComment(false);
    // setTimeout(() => {
    //   setAnimationSide('right');
    // }, 500);
  };

  const date = moment.parseZone(created).calendar();

  const onLike = (e: MouseEvent) => {
    //TODO Fix ts click event interface
    // @ts-ignore
    const targetData = e.target.dataset;
    if (targetData.type === 'post' && targetData.info) {
      toggleLike();
    }
  };

  useEffect(() => {
    if (isUserPost) {
      document.addEventListener('dblclick', onLike);
      return () => {
        document.removeEventListener('dblclick', onLike);
      };
    }
  }, []);

  return (
    <Card className={classes.post}>
      <CardHeader
        avatar={
          isLoadingPost ? (
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
          isLoadingPost ? (
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
          isLoadingPost ? (
            <Skeleton animation="wave" height={10} width="40%" />
          ) : (
            date
          )
        }
      />
      {isLoadingPost ? (
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
        {isLoadingPost ? (
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
