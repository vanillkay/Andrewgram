import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import smoothscroll from 'smoothscroll-polyfill';

import ProfileInfo from 'components/profile/ref';
// import NewPost from 'components/profile/new-post';
import { getUserInfo } from 'store/user/selectors';
import ProfilePostsGrid from 'components/profile/posts';
import { getRecommended, getSubscriptions } from 'store/subscribers/selectors';
import { useStyles } from './styles';
import { getVisitedUser, isOwnUserPage } from './helpers';

smoothscroll.polyfill();

const ProfilePage = () => {
  const { login } = useParams<{ login: string }>();
  // const dispatch = useDispatch();
  const user = useSelector(getUserInfo);

  const visitedUser = getVisitedUser(
    useSelector(getRecommended),
    useSelector(getSubscriptions),
    login
  );

  const isOwn = isOwnUserPage(login, user.login);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    if (!isOwn) {
      // dispatch(setUserPosts([]));
    }
    // request('/posts/users', 'post', { login })
    //   .then((res) => {
    //     dispatch(setUserPosts(res.posts, user.login));
    //     dispatch(setVisitedUserInfo(res.userInfo));
    //   })
    //   .catch(() => {});
  }, [login]);

  const classes = useStyles();

  return (
    <div className={classes['profile-page']}>
      <ProfileInfo
        user={isOwn ? user : visitedUser}
        isOwn={isOwn}
        // isLoading={loading}
      />
      {/*{isOwn && <NewPost isLoading={loading} />}*/}
      <ProfilePostsGrid user={isOwn ? user : visitedUser} isLoading={false} />
    </div>
  );
};

export default ProfilePage;
