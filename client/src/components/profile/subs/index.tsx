import { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { Backdrop, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ProfileRef from 'components/profile/ref';

const useStyles = makeStyles((theme) => ({
  'profile__subs-title': {
    marginTop: '1rem',
    fontWeight: 'bold',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  'all-subs': {
    minWidth: '250px',
    boxSizing: 'border-box',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: theme.shadows[5],
    padding: '1rem 0',
    position: 'relative',
    '&:focus': {
      outline: 'none',
    },
  },
  'all-subs__list': {
    maxHeight: '12rem',
    overflowX: 'hidden',
    padding: '0 2rem',
  },
  'all-subs__list-item': {
    display: 'flex',
    margin: '1rem 0',
    alignItems: 'center',
  },
  'all-subs__title': {
    textAlign: 'center',
    fontWeight: 'bold',
    position: 'relative',
    paddingBottom: '1rem',
    top: 0,
    borderBottom: '2px solid black',
  },
  'all-subs__close-btn': {
    position: 'absolute',
    top: '-3px',
    right: '1rem',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  'all-subs__item-avatar': {
    width: '3rem',
    height: '3rem',
  },
  'all-subs__list-empty': {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: '1rem',
  },
  '@media (min-width: 600px)': {
    'profile__subs-title': {
      marginTop: 0,
    },
    'all-subs': {
      minWidth: '400px',
    },
  },
}));

const ProfileSubs = (props) => {
  const { user, ownUser } = props;
  const classes = useStyles();

  const [isModal, setIsModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({});

  const openModal = (info) => {
    setModalInfo(info);
    setIsModal(true);
  };

  const checkSubs = (subscriptions, userLogin) => {
    const candidate = subscriptions.findIndex(
      (item) => item.login === userLogin
    );
    if (candidate === -1) {
      return 'recommended';
    } else {
      return 'subscription';
    }
  };

  return (
    <>
      <div
        onClick={() => openModal({ type: 'Подписчики' })}
        className={classes['profile__subs-title']}
      >
        Подписчики {user.subscribers.length}
      </div>
      <div
        onClick={() => openModal({ type: 'Подписки' })}
        className={classes['profile__subs-title']}
      >
        Подписки {user.subscriptions.length}
      </div>
      {isModal && (
        <Modal
          disableAutoFocus
          disableEnforceFocus={true}
          disableRestoreFocus={true}
          disablePortal={true}
          className={classes.modal}
          open={isModal}
          onClose={() => setIsModal(false)}
          closeAfterTransition
          disableScrollLock={true}
          BackdropComponent={Backdrop}
        >
          <div className={classes['all-subs']}>
            <div className={classes['all-subs__title']}>
              {modalInfo.type}
              <CloseIcon
                onClick={() => setIsModal(false)}
                className={classes['all-subs__close-btn']}
              />
            </div>
            <div className={classes['all-subs__list']}>
              {modalInfo.type === 'Подписки'
                ? user.subscriptions.map((item, index) => (
                    <ProfileRef
                      type={checkSubs(ownUser.subscriptions, item.login)}
                      key={index}
                      avatarClass={classes['all-subs__item-avatar']}
                      isOwn={item.login === ownUser.login}
                      isList={true}
                      avatar={item.avatar}
                      login={item.login}
                    />
                  ))
                : user.subscribers.map((item, index) => (
                    <ProfileRef
                      type={checkSubs(ownUser.subscriptions, item.login)}
                      key={index}
                      avatarClass={classes['all-subs__item-avatar']}
                      isOwn={item.login === ownUser.login}
                      isList={true}
                      avatar={item.avatar}
                      login={item.login}
                    />
                  ))}
            </div>
            {(modalInfo.type === 'Подписки'
              ? !user.subscriptions.length
              : !user.subscribers.length) && (
              <div className={classes['all-subs__list-empty']}>
                {modalInfo.type === 'Подписки' ? 'Подписок' : 'Подписчиков'} нет
              </div>
            )}
          </div>
        </Modal>
      )}
    </>
  );
};

export default ProfileSubs;
