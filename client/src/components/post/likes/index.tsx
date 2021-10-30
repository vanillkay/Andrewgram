import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { Fade, Modal, Backdrop } from '@material-ui/core';

import { useStyles } from './styles';
import { LikesProps } from './types';
import { mapLikes } from './helpers';

const Likes = ({ likes }: LikesProps) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
    <>
      <p onClick={handleOpen} className={classes.likes}>
        {likes.length} отметок "Нравится"
      </p>
      <Modal
        open={open}
        disableAutoFocus
        disableEnforceFocus
        closeAfterTransition
        onClose={handleClose}
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
                onClick={handleClose}
                className={classes['all-likes__close-btn']}
              />
            </div>
            <div className={classes['all-likes__list']}>
              {mapLikes(likes)}
              {!likes.length && (
                <div className={classes['all-likes__no-likes']}>
                  Лайков пока что нет
                </div>
              )}
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
};
export { Likes };
