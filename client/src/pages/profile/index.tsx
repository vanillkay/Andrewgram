import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import smoothscroll from 'smoothscroll-polyfill';

import { useHttp } from 'hooks/http.hook';
import ProfileInfo from 'components/profile/ref';
import NewPost from 'components/profile/new-post';
import { setUserPosts } from 'store/posts/actions';
import { getUserInfo } from 'store/user/selectors';
import { setVisitedUserInfo } from 'store/user/actions';
import ProfilePostsGrid from 'components/profile/posts';
import { getRecommended, getSubscriptions } from 'store/subscribers/selectors';

smoothscroll.polyfill();

const useStyles = makeStyles(() => ({
  'profile-page': {
    padding: '4rem 2rem',
    margin: '0 auto',
  },
}));

const ProfilePage = () => {
  const classes = useStyles();

  const { request, loading } = useHttp();

  const { login } = useParams();

  const dispatch = useDispatch();

  const user = useSelector(getUserInfo);

  const visitedUser = [
    ...useSelector(getRecommended),
    ...useSelector(getSubscriptions),
  ].filter((item) => item.login === login)[0];

  const isOwn = login === user.login;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    if (!isOwn) {
      dispatch(setUserPosts([]));
    }
    request('/posts/users', 'post', { login })
      .then((res) => {
        dispatch(setUserPosts(res.posts, user.login));
        dispatch(setVisitedUserInfo(res.userInfo));
      })
      .catch(() => {});
  }, [login]);

  return (
    <div className={classes['profile-page']}>
      <ProfileInfo
        user={isOwn ? user : visitedUser}
        isOwn={isOwn}
        isLoading={loading}
      />
      {isOwn && <NewPost isLoading={loading} />}
      <ProfilePostsGrid user={isOwn ? user : visitedUser} isLoading={loading} />
    </div>
  );
};

export default ProfilePage;