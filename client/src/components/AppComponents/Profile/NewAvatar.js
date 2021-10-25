import React, { useRef, useState } from 'react';
import { Avatar, Backdrop, Button, Input, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { setUserAvatar } from '../../../store/user/actions';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Montserrat',
  },
  'new-avatar': {
    fontFamily: 'Montserrat',
    minWidth: '500px',
    boxSizing: 'border-box',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: theme.shadows[5],
    position: 'relative',
    padding: '3rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '&:focus': {
      outline: 'none',
    },
  },
  'new-avatar__file-error': {
    marginTop: '1rem',
    textAlign: 'center',
    color: theme.colors.error,
    fontWeight: 'bold',
  },
  'new-avatar__load-btn': {
    marginTop: '2rem',
  },
}));

const NewAvatar = (props) => {
  const { open, login } = props;

  const classes = useStyles();

  const [img, setImg] = useState('');

  const [error, setError] = useState({ isError: false, text: '' });

  const [inputImg, setInputImg] = useState('');

  const dispatch = useDispatch();

  const input = useRef();

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
      setError({ isError: true, text: 'Выбраный файл не есть изображением !' });
      return;
    }
    setError({ isError: false, text: '' });
    setInputImg(event.target.file);
    const reader = new FileReader();
    reader.addEventListener('load', (e) => {
      setImg(e.target.result);
    });
    reader.readAsDataURL(file);
  };

  const download = async () => {
    try {
      const formData = new FormData();
      formData.append('avatar', input.current.files[0]);
      formData.set('user', login);

      const res = await fetch('/user/avatar', {
        method: 'post',
        body: formData,
      });

      const data = await res.json();
      if (data.path) {
        dispatch(setUserAvatar(data.path));
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
