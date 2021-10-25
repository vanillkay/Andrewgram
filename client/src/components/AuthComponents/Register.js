import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHttp } from '../../hooks/http.hook';

const useStyles = makeStyles((theme) => ({
  inputs: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '60%',
    marginTop: '20px',
  },
  'form-actions': {
    width: '100%',
    marginTop: '2rem',
    display: 'flex',
    justifyContent: 'center',
  },
  'form-title': {
    textAlign: 'center',
    fontSize: '1.5rem',
  },
  form: {
    '& .MuiFormHelperText-root	': {
      fontSize: '1rem',
    },
  },
  'register-error': {
    color: theme.colors.error,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  'register-success': {
    color: theme.colors.success,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '1.2rem',
  },
}));
const validateEmail = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const Register = () => {
  const [errors, setErrors] = useState({
    login: false,
    password: false,
    name: false,
    email: false,
    rePassword: false,
  });
  const [errorText, setErrorText] = useState({
    login: '',
    password: '',
    name: '',
    email: '',
    rePassword: '',
  });
  const [inputs, setInputs] = useState({
    login: '',
    password: '',
    name: '',
    email: '',
    rePassword: '',
  });

  const { loading, request } = useHttp();
  const [isServerError, setIsServerError] = useState(false);
  const [serverErrorText, setServerErrorText] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const checkFieldValue = (field, min, error) => {
    if (field.value.length < min) {
      setErrors((prevState) => ({ ...prevState, [field.name]: true }));
      setErrorText((prevState) => ({ ...prevState, [field.name]: error }));
      return true;
    } else if (field.value.length >= min) {
      setErrors((prevState) => ({ ...prevState, [field.name]: false }));
      setErrorText((prevState) => ({ ...prevState, [field.name]: '' }));
      return false;
    }
  };

  const handleInputs = (e) => {
    const field = e.target;
    if (field.name === 'login') {
      checkFieldValue(field, 5, 'Минимальная длина 5 символов');
    }
    if (field.name === 'password') {
      checkFieldValue(field, 7, 'Минимальная длина 7 символов');
    }
    if (field.name === 'email') {
      if (!validateEmail(field.value)) {
        setErrors((prevState) => ({ ...prevState, email: true }));
        setErrorText((prevState) => ({
          ...prevState,
          email: 'Введите правильный email',
        }));
      } else {
        setErrors((prevState) => ({ ...prevState, email: false }));
        setErrorText((prevState) => ({ ...prevState, email: '' }));
      }
    }
    if (field.name === 'rePassword') {
      if (field.value !== inputs.password) {
        setErrors((prevState) => ({ ...prevState, rePassword: true }));
        setErrorText((prevState) => ({
          ...prevState,
          rePassword: 'Пароли не совпадают',
        }));
      } else if (errors.rePassword) {
        setErrors((prevState) => ({ ...prevState, rePassword: false }));
        setErrorText((prevState) => ({ ...prevState, rePassword: '' }));
      }
    }
    return setInputs((prevInput) => ({
      ...prevInput,
      [field.name]: field.value,
    }));
  };

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      let isValid = true;
      for (let value in inputs) {
        if (value === 'name') continue;
        if (!inputs[value]) {
          isValid = false;
          setErrors((prevState) => ({ ...prevState, [value]: true }));
          setErrorText((prevState) => ({
            ...prevState,
            [value]: 'Введите значение',
          }));
        }
      }
      if (!isValid) return;

      for (let error in errors) {
        if (error === 'name') continue;
        if (errors[error]) return;
      }

      const userInputs = { ...inputs };

      delete userInputs.rePassword;

      const userValues = { ...userInputs };

      const user = await request('/auth/register', 'post', userValues);

      if (!user.user) {
        throw new Error('Ошибка регистрации');
      } else {
        if (isServerError) {
          setIsServerError(false);
        }
        setInputs({
          login: '',
          name: '',
          email: '',
          password: '',
          rePassword: '',
        });
        setIsSuccess(true);
      }
    } catch (error) {
      if (error.message.toLowerCase().includes('логин')) {
        setErrors((prevState) => ({ ...prevState, login: true }));
      } else if (error.message.includes('email')) {
        setErrors((prevState) => ({ ...prevState, email: true }));
      } else if (
        error.message.toLowerCase().includes('пароль') ||
        error.message.toLowerCase().includes('пароли')
      ) {
        setErrors((prevState) => ({
          ...prevState,
          password: true,
          rePassword: true,
        }));
      }
      setIsServerError(true);
      setServerErrorText(e.message);
    }
  };

  const classes = useStyles();
  return (
    <div>
      <div className={classes['form-title']}>Введите данные</div>
      <form className={classes.form}>
        <div className={classes.inputs}>
          <TextField
            className={classes.input}
            error={errors.login}
            id="filled-error-helper-text2"
            label="Логин"
            onChange={handleInputs}
            helperText={errorText.login}
            variant="filled"
            name={'login'}
            value={inputs.login}
          />
          <TextField
            className={classes.input}
            error={errors.name}
            id="filled-error-helper-text5"
            label="Имя"
            onChange={handleInputs}
            helperText={errorText.name}
            variant="filled"
            name={'name'}
            value={inputs.name}
          />
          <TextField
            className={classes.input}
            error={errors.email}
            id="filled-error-helper-text6"
            label="Email"
            onChange={handleInputs}
            helperText={errorText.email}
            variant="filled"
            name={'email'}
            value={inputs.email}
          />
          <TextField
            className={classes.input}
            error={errors.password}
            type="password"
            id="filled-error-helper-text3"
            label="Пароль"
            onChange={handleInputs}
            helperText={errorText.password}
            variant="filled"
            name={'password'}
            value={inputs.password}
          />
          <TextField
            className={classes.input}
            error={errors.rePassword}
            type="password"
            id="filled-error-helper-text4"
            label="Пароль ещё раз"
            onChange={handleInputs}
            helperText={errorText.rePassword}
            variant="filled"
            name={'rePassword'}
            value={inputs.rePassword}
          />
        </div>
        {isServerError && (
          <p className={classes['register-error']}>{serverErrorText}</p>
        )}
        {isSuccess && (
          <p className={classes['register-success']}>
            Вы успешно зарегистрировались
          </p>
        )}
        <div className={classes['form-actions']}>
          <Button
            onClick={handleForm}
            disabled={loading}
            type={'submit'}
            variant="contained"
            color="primary"
          >
            Зарегестривароваться
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Register;
