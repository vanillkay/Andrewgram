import React, { useEffect, useRef } from 'react';
import PostsList from '../components/AppComponents/PostsList/PostsList';
import { makeStyles } from '@material-ui/core/styles';
import SideProfileInfo from '../components/AppComponents/SideProfileInfoComponents/SideProfileInfo/SideProfileInfo';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPostsLoading } from '../store/posts/selectors';
import { useHttp } from '../hooks/http.hook';
import { getUserInfo } from '../store/user/selectors';
import { setAllPosts, toggleAllPostsLoading } from '../store/posts/actions';

const useStyles = makeStyles(() => ({
  main: {
    width: '100%',
    height: 'auto',
    minHeight: '97vh',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '4rem',
  },
  main__posts: {
    width: '100%',
  },
  'main__profile-info': {
    width: '100%',
  },
  '@media (min-width: 600px)': {
    main: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    main__posts: {
      width: '40%',
      maxWidth: '700px',
    },
    'main__profile-info': {
      width: '20%',
      marginLeft: '2rem',
      position: 'sticky',
      top: 'calc(4rem + 10px)',
      minWidth: '300px',
    },
  },
}));

const Andrewgram = () => {
  const classes = useStyles();

  const { request } = useHttp();

  const isLoadingInfo = useSelector(getAllPostsLoading);

  const dispatch = useDispatch();

  const user = useSelector(getUserInfo);

  const app = useRef();

  useEffect(() => {
    dispatch(toggleAllPostsLoading());
    request('/posts/all', 'post', { login: user.login, length: 3 })
      .then((res) => {
        dispatch(setAllPosts(res.posts, user.login));
        dispatch(toggleAllPostsLoading());
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <div ref={app} className={classes.main}>
        <div className={classes.main__posts}>
          <PostsList isLoading={isLoadingInfo} />
        </div>
        <div className={classes['main__profile-info']}>
          <SideProfileInfo />
        </div>
      </div>
    </>
  );
};

export default Andrewgram;
