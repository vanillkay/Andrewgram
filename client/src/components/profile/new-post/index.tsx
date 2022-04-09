import { useDispatch } from 'react-redux';
import { Skeleton } from '@material-ui/lab';
import { FC, useRef, useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { Backdrop, Button, Input, Modal, TextField } from '@material-ui/core';

import { useStyles } from './styles';

const NewPost: FC<{ isLoading: boolean }> = ({ isLoading }) => {
  const [isNewPost, setIsNewPost] = useState<boolean>(false);

  const [newPostInfo, setNewPostInfo] = useState<string>('');

  const [isError, setIsError] = useState<boolean>(false);

  // @ts-ignore
  const handleInput = (e) => {
    setNewPostInfo(e.target.value);
  };

  const classes = useStyles();

  const fileInput = useRef();

  const dispatch = useDispatch();

  const handleOpen = () => {
    setIsNewPost(true);
  };

  const handleClose = () => {
    setIsNewPost(false);
  };

  const download = async () => {
    try {
      // @ts-ignore
      if (!fileInput.current.files[0]) {
        setIsError(true);
        return;
      }

      if (isError) setIsError(false);
      let formData = new FormData();
      // @ts-ignore
      formData.append('avatar', fileInput.current.files[0]);
      formData.set('user', 'andrew');
      formData.set('info', newPostInfo);

      const res = await fetch('/post/new', {
        method: 'post',
        body: formData,
      });

      const data = await res.json();

      if (data.post) {
        // dispatch(addUserPost(data.post));
        setIsNewPost(false);
        setNewPostInfo('');
      }
    } catch (e) {}
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '1rem' }}>
      {isLoading ? (
        <Skeleton width={'20%'} style={{ margin: '0 auto' }} />
      ) : (
        <>
          <Button onClick={handleOpen}>Создать пост</Button>
          <Modal
            disableAutoFocus
            disableEnforceFocus
            className={classes.modal}
            open={isNewPost}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
          >
            <div className={classes['new-post']}>
              <CloseIcon
                onClick={handleClose}
                className={classes['new-post__close-btn']}
              />
              <div className={classes['new-post__title']}>
                Создание нового поста
              </div>
              <div className={classes['new-post__input-title']}>Фото поста</div>
              <Input
                // @ts-ignore
                accept="image/*"
                id="contained-button-file"
                multiple
                className={classes['new-post__input-file']}
                type="file"
                name={'avatar'}
                inputRef={fileInput}
              />
              <div className={classes['new-post__input-title']}>
                Информация о посте
              </div>
              <TextField
                className={classes['new-post__info']}
                id="standard-textarea"
                placeholder="Информация"
                multiline
                onChange={handleInput}
                value={newPostInfo}
              />
              {isError && (
                <div className={classes['new-post__error']}>
                  Сначала загрузите фото
                </div>
              )}
              <Button
                className={classes['new-post__load-btn']}
                variant={'contained'}
                color={'primary'}
                onClick={download}
              >
                загрузить
              </Button>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
};

export default NewPost;
