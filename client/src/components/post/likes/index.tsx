import { FC } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { Fade, Modal, Backdrop } from '@material-ui/core';

import { useToggle } from 'hooks/useToggle';

import { useStyles } from './styles';
import { LikesProps } from './types';
import { mapLikes } from './helpers';

const Likes: FC<LikesProps> = ({ likes }) => {
  const classes = useStyles();

  const [open, toggleOpen] = useToggle();

  return (
    <>
      <p onClick={toggleOpen} className={classes.likes}>
        {likes.length} отметок "Нравится"
      </p>
      <Modal
        open={open}
        disableAutoFocus
        disableEnforceFocus
        closeAfterTransition
        onClose={toggleOpen}
        className={classes.modal}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes['all-likes']}>
            <div className={classes['all-likes__title']}>
              Отметки "Нравится"
              <CloseIcon
                onClick={toggleOpen}
                className={classes['all-likes__close-btn']}
              />
            </div>
            <div className={classes['all-likes__list']}>
              {!likes.length ? (
                <div className={classes['all-likes__no-likes']}>
                  Лайков пока что нет
                </div>
              ) : (
                mapLikes(likes)
              )}
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
};
export { Likes };
