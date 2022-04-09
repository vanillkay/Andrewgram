import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import ProfileSubs from 'components/profile/subs';
import { logoutUserAction } from 'store/user/actions';
import { getUserInfo, getVisitedUserInfo } from 'store/user/selectors';

import NewAvatar from '../new-avatar';
import { useStyles } from './styles';

// @ts-ignore
const ProfileRef = (props) => {
  const {
    type,
    isOwn,
    avatarClass,
    isLoading,
    isPageComp = false,
    avatar = '',
    login = 'andrew',
    isList = false,
  } = props;

  const dispatch = useDispatch();

  const [isNewAvatar, setNewAvatar] = useState(false);

  const user = useSelector(getUserInfo);
  const classes = useStyles({ type, isPage: isPageComp, isList });

  const visitedUser = useSelector(getVisitedUserInfo);

  const toggleSubsBtn = () => {
    // dispatch(toggleLoading());
    // request('/user/subs', 'post', {
    //   login,
    //   avatar: avatar,
    //   type,
    //   userLogin: user.login,
    // })
    //   .then((res) => {
    //     if (res.success) {
    //       dispatch(toggleSubs({ login, type }));
    //       dispatch(toggleUserSubs({ login, avatar }));
    //     }
    //   })
    //   .catch(() => {})
    //   .finally(() => {
    //     dispatch(toggleLoading());
    //   });
  };

  const btnText = type === 'subscription' ? 'Отписаться' : 'Подписаться';

  const logout = () => {
    dispatch(logoutUserAction());
    // if (res.success) {
    //   dispatch(logoutUser());
    // }
  };

  return (
    <div className={classes.profile}>
      {isPageComp ? (
        <>
          <div className={classes.profile__info}>
            <Avatar
              className={avatarClass || classes.profile__avatar}
              src={'/' + avatar}
            />
            <div className={classes.profile__name}>{login}</div>
          </div>
          {isPageComp && (
            <ProfileSubs
              // className={classes['profile__subs-list']}
              ownUser={user}
              user={isOwn ? user : visitedUser}
            />
          )}
          {isOwn && (
            <Button
              variant={'contained'}
              color={'primary'}
              onClick={() => setNewAvatar(true)}
              // disabled={loading}
              className={classes['profile__logout-btn']}
            >
              Изменить аватар
            </Button>
          )}
        </>
      ) : (
        <Link
          to={{ pathname: '/profile/' + login }}
          className={classes.profile__info}
        >
          <Avatar
            alt="Avatar"
            className={avatarClass || classes.profile__avatar}
            src={'/' + avatar}
          />
          <div className={classes.profile__name}>{login}</div>
        </Link>
      )}
      {isOwn ? (
        !isList && (
          <Button
            variant={'contained'}
            color={'primary'}
            onClick={logout}
            // disabled={loading}
            className={classes['profile__logout-btn']}
          >
            Выйти
          </Button>
        )
      ) : (
        <Button
          disableRipple
          disabled={isLoading}
          onClick={toggleSubsBtn}
          className={classes['profile__sbsc-btn']}
        >
          {btnText}
        </Button>
      )}
      {isNewAvatar && <NewAvatar login={login} open={setNewAvatar} />}
    </div>
  );
};

export default ProfileRef;
