import { useState } from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import { useHttp } from 'hooks/http.hook';

const useStyles = makeStyles((theme) => ({
  'reset-form': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    maxWidth: '500px',
    margin: '0 auto',
  },
  'reset-form__input': {
    marginBottom: '1rem',
    minWidth: '250px',
  },
  'reset-form__title': {
    marginBottom: '2rem',
  },
  'reset-form__action': {
    marginTop: '2rem',
  },
  'reset-form__resp': {
    fontSize: '1.2rem',
  },
  'reset-form__resp-success': {
    color: theme.colors.success,
  },
  'reset-form__resp-error': {
    color: theme.colors.error,
  },
}));

const ResetPassword = (props) => {
  const { token } = props;

  const [password, setPassword] = useState({ password: '', rePassword: '' });
  const [error, setError] = useState({ password: false, rePassword: false });
  const [errorText, setErrorText] = useState({ password: '', rePassword: '' });

  const [serverError, setServerError] = useState({
    isError: false,
    errorText: '',
  });
  const [isReady, setIsReady] = useState(false);

  const classes = useStyles();
  const history = useHistory();
  const { loading, request } = useHttp();

  const handleInputs = (e) => {
    const field = e.target;
    if (field.name === 'password') {
      if (field.value.length < 7) {
        setError((prevState) => ({ ...prevState, password: true }));
        setErrorText((prevState) => ({
          ...prevState,
          password: 'Минимальная длина 7 символов',
        }));
      } else {
        setError((prevState) => ({ ...prevState, password: false }));
        setErrorText((prevState) => ({ ...prevState, password: '' }));
      }
    }
    if (field.name === 'rePassword') {
      if (password.password !== field.value) {
        setError((prevState) => ({ ...prevState, rePassword: true }));
        setErrorText((prevState) => ({
          ...prevState,
          rePassword: 'Пароли должны совпадать',
        }));
      } else {
        setError((prevState) => ({ ...prevState, rePassword: false }));
        setErrorText((prevState) => ({ ...prevState, rePassword: '' }));
      }
    }
    setPassword((prevState) => ({ ...prevState, [field.name]: field.value }));
  };

  const resetPassword = (e) => {
    e.preventDefault();

    if (password.password.length < 7) {
      setError((prevState) => ({ ...prevState, password: true }));
      setErrorText((prevState) => ({
        ...prevState,
        password: 'Минимальная длина 7 символов',
      }));
      return;
    }

    if (password.password !== password.rePassword) {
      setError((prevState) => ({ ...prevState, rePassword: true }));
      setErrorText((prevState) => ({
        ...prevState,
        rePassword: 'Пароли должны совпадать',
      }));
      return;
    }

    request('/auth/reset/password', 'post', Object.assign(password, { token }))
      .then((resp) => {
        if (resp.success) {
          setServerError({ isError: false, errorText: '' });
          setPassword({ password: '', rePassword: '' });
        }
      })
      .catch((err) =>
        setServerError({ isError: true, errorText: err.message || err })
      )
      .finally(() => setIsReady(true));
  };

  return (
    <form className={classes['reset-form']}>
      <div className={classes['reset-form__title']}>Введите новый пароль</div>
      <TextField
        className={classes['reset-form__input']}
        error={error.password}
        type="password"
        id="filled-error-helper-text23"
        label="Пароль"
        onChange={handleInputs}
        helperText={errorText.password}
        variant="filled"
        name={'password'}
        value={password.password}
      />
      <TextField
        className={classes['reset-form__input']}
        error={error.rePassword}
        type="password"
        id="filled-error-helper-text44"
        label="Пароль ещё раз"
        onChange={handleInputs}
        helperText={errorText.rePassword}
        variant="filled"
        name={'rePassword'}
        value={password.rePassword}
      />
      <div className={classes['reset-form__resp']}>
        {isReady && serverError.isError && (
          <div className={classes['reset-form__resp-error']}>
            {serverError.errorText}
          </div>
        )}
        {isReady && !serverError.isError && (
          <div className={classes['reset-form__resp-success']}>
            Вы успешно изменили пароль
          </div>
        )}
      </div>
      <Button
        onClick={resetPassword}
        className={classes['reset-form__action']}
        disabled={loading}
        type={'submit'}
        variant="contained"
        color="primary"
      >
        Измeнить пароль
      </Button>
      {isReady && !serverError.isError && (
        <Button
          onClick={() => history.push('/auth')}
          className={classes['reset-form__action']}
          disabled={loading}
          type={'submit'}
          variant="contained"
          color="primary"
        >
          Авторизоваться
        </Button>
      )}
    </form>
  );
};

export { ResetPassword };
