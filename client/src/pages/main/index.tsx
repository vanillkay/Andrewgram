import { Dispatch } from 'redux';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PostsList from 'components/posts';
import { useHttp } from 'hooks/http.hook';
import { getUserInfo } from 'store/user/selectors';
import SideProfileInfo from 'components/side-info';
import { getAllPostsLoading } from 'store/posts/selectors';
import { setAllPosts, toggleAllPostsLoading } from 'store/posts/actions';
import { useStyles } from './styles';

const MainPage = () => {
  const classes = useStyles();

  const { request } = useHttp();
  const dispatch = useDispatch<Dispatch>();

  const isLoadingInfo = useSelector(getAllPostsLoading);
  const user = useSelector(getUserInfo);

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
    <div className={classes.main}>
      <div className={classes.main__posts}>
        <PostsList isLoading={isLoadingInfo} />
      </div>
      <div className={classes['main__profile-info']}>
        <SideProfileInfo />
      </div>
    </div>
  );
};

export { MainPage };
