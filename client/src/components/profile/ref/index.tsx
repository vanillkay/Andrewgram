import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';

import { useHttp } from 'hooks/http.hook';
import ProfileSubs from 'components/profile/subs';
import { logoutUser, toggleUserSubs } from 'store/user/actions';
import { toggleLoading, toggleSubs } from 'store/subscribers/actions';
import { getUserInfo, getVisitedUserInfo } from 'store/user/selectors';

import NewAvatar from '../new-avatar';

const useStyles = makeStyles((theme) => ({
  profile: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: (props) => (props.isPage ? 'column' : 'row'),
    justifyContent: 'space-between',
    width: '100%',
    marginTop: (props) => (props.isList ? '1rem' : ''),
  },
  profile__info: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: 'inherit',
  },
  profile__avatar: {
    width: '4rem',
    height: '4rem',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  profile__name: {
    marginLeft: '1rem',
    fontWeight: 'bold',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  'profile__sbsc-btn': {
    fontSize: '1rem',
    marginRight: '.5rem',
    textTransform: 'none',
    color: (props) => (props.type === 'subscription' ? '' : theme.colors.main),
    '&:hover': {
      background: 'none',
    },
  },
  'profile__logout-btn': {
    minWidth: '5rem',
    minHeight: '2rem',
    marginTop: '1rem',
  },
  'profile__subs-list': {
    marginTop: '1rem',
    fontWeight: 'bold',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  '@media (min-width: 600px)': {
    profile: {
      flexDirection: () => 'row',
    },
    'profile__logout-btn': {
      marginTop: '0',
    },
    'profile__sbsc-btn': {
      fontSize: '.8rem',
    },
    'profile__subs-list': {
      marginTop: 0,
    },
  },
}));

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

  const { request, loading } = useHttp();
  const [isNewAvatar, setNewAvatar] = useState(false);

  const user = useSelector(getUserInfo);

  const visitedUser = useSelector(getVisitedUserInfo);

  const toggleSubsBtn = () => {
    dispatch(toggleLoading());
    request('/user/subs', 'post', {
      login,
      avatar: avatar,
      type,
      userLogin: user.login,
    })
      .then((res) => {
        if (res.success) {
          dispatch(toggleSubs({ login, type }));
          dispatch(toggleUserSubs({ login, avatar }));
        }
      })
      .catch(() => {})
      .finally(() => {
        dispatch(toggleLoading());
      });
  };

  const btnText = type === 'subscription' ? 'Отписаться' : 'Подписаться';

  const logout = () => {
    request('/auth/logout')
      .then((res) => {
        if (res.success) {
          dispatch(logoutUser());
        }
      })
      .catch(() => {});
  };

  const classes = useStyles({ type, isOwn, isPage: isPageComp, isList });

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
              className={classes['profile__subs-list']}
              ownUser={user}
              user={isOwn ? user : visitedUser}
            />
          )}
          {isOwn && (
            <Button
              variant={'contained'}
              color={'primary'}
              onClick={() => setNewAvatar(true)}
              disabled={loading}
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
            disabled={loading}
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
