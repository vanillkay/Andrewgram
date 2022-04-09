import { FC, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Backdrop, Button, Input, Modal } from '@material-ui/core';

import { useStyles } from './styles';

const NewAvatar: FC<{ open: (param: boolean) => void; login: string }> = ({
  open,
  login,
}) => {
  const classes = useStyles();

  const [img, setImg] = useState<string>('');

  const [error, setError] = useState({ isError: false, text: '' });

  const [inputImg, setInputImg] = useState<string>('');

  const dispatch = useDispatch();

  const input = useRef();

  // @ts-ignore
  const downloadImg = (event) => {
    const file = event.target.files[0];
    if (!file.type) {
      setInputImg('');
      setImg('');
      setError({
        isError: true,
        text: 'Ошибка, эта функция не поддерживается в вашем браузере !',
      });
      return;
    }
    if (!file.type.match('image.*')) {
      setInputImg('');
      setImg('');
      setError({
        isError: true,
        text: 'Выбранный файл не есть изображением !',
      });
      return;
    }
    setError({ isError: false, text: '' });
    setInputImg(event.target.file);
    const reader = new FileReader();
    reader.addEventListener('load', (e) => {
      // @ts-ignore
      setImg(e.target.result);
    });
    reader.readAsDataURL(file);
  };

  const download = async () => {
    try {
      const formData = new FormData();
      // @ts-ignore
      formData.append('avatar', input.current.files[0]);
      formData.set('user', login);

      const res = await fetch('/user/avatar', {
        method: 'post',
        body: formData,
      });

      const data = await res.json();
      if (data.path) {
        // dispatch(setUserAvatar(data.path));
        open(false);
      } else {
        setError({
          isError: true,
          text: 'Что-то пошло не так попробуйте позже',
        });
      }
    } catch (e) {
      setError({ isError: true, text: 'Cерверная ошибка попробуйте позже' });
    }
  };

  return (
    <Modal
      disableAutoFocus
      disableEnforceFocus
      className={classes.modal}
      open={true}
      onClose={() => open(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
    >
      <div className={classes['new-avatar']}>
        <Avatar style={{ width: '7rem', height: '7rem' }} src={img} />
        <Input
          // @ts-ignore
          accept="image/*"
          id="contained-button-file"
          multiple
          type="file"
          name={'avatar'}
          value={inputImg}
          inputRef={input}
          style={{ marginTop: '1rem' }}
          onChange={downloadImg}
        />
        {error.isError && (
          <div className={classes['new-avatar__file-error']}>{error.text}</div>
        )}
        <Button
          className={classes['new-avatar__load-btn']}
          onClick={download}
          variant={'contained'}
          color={'primary'}
        >
          загрузить
        </Button>
      </div>
    </Modal>
  );
};

export default NewAvatar;
