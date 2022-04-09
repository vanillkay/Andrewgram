import { FC, useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { Backdrop, Modal } from '@material-ui/core';

import ProfileRef from 'components/profile/ref';
import { useStyles } from './styles';
import { User } from '../../../types/user';

const ProfileSubs: FC<{ user: User; ownUser: User }> = ({ user, ownUser }) => {
  const classes = useStyles();

  const [isModal, setIsModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({});

  // @ts-ignore
  const openModal = (info) => {
    setModalInfo(info);
    setIsModal(true);
  };
  // @ts-ignore
  const checkSubs = (subscriptions, userLogin) => {
    const candidate = subscriptions.findIndex(
      // @ts-ignore
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
              {/*// @ts-ignore*/}
              {modalInfo.type}
              <CloseIcon
                onClick={() => setIsModal(false)}
                className={classes['all-subs__close-btn']}
              />
            </div>
            <div className={classes['all-subs__list']}>
              {/*// @ts-ignore*/}
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
                      // @ts-ignore
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
            {/*// @ts-ignore*/}
            {(modalInfo.type === 'Подписки'
              ? !user.subscriptions.length
              : !user.subscribers.length) && (
              <div className={classes['all-subs__list-empty']}>
                {/*// @ts-ignore*/}
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
