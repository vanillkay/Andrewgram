import { useState } from 'react';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Form, Formik, FormikHelpers } from 'formik';

import { registerUserAction } from 'store/user/actions';
import FormikInputField from 'components/common/input-field';

import { useStyles } from './styles';
import { RegisterFormValues } from './types';
import { registerInitialValues, registerValidationSchema } from './config';

const RegisterForm = () => {
  const [isServerError, setIsServerError] = useState(false);
  const [serverErrorText, setServerErrorText] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const dispatch = useDispatch();

  const handleForm = (
    values: RegisterFormValues,
    helpers: FormikHelpers<RegisterFormValues>
  ) => {
    helpers.setSubmitting(true);
    const { confirmPassword, ...userValues } = values;

    dispatch(registerUserAction(userValues));

    // if (!user.user) {
    //   throw new Error('Ошибка регистрации');
    // } else {
    //   if (isServerError) {
    //     setIsServerError(false);
    //   }
    //   setIsSuccess(true);
    // }
    // if (error.message.toLowerCase().includes('логин')) {
    //   setErrors((prevState) => ({ ...prevState, login: true }));
    // } else if (error.message.includes('email')) {
    //   setErrors((prevState) => ({ ...prevState, email: true }));
    // } else if (
    //   error.message.toLowerCase().includes('пароль') ||
    //   error.message.toLowerCase().includes('пароли')
    // ) {
    //   setErrors((prevState) => ({
    //     ...prevState,
    //     password: true,
    //     rePassword: true,
    //   }));
    // }
    // setIsServerError(true);
    // setServerErrorText(e.message);
  };

  const classes = useStyles();
  return (
    <div>
      <div className={classes['form-title']}>Введите данные</div>
      <Formik<RegisterFormValues>
        validationSchema={registerValidationSchema}
        initialValues={registerInitialValues}
        onSubmit={handleForm}
      >
        {({ isSubmitting }) => (
          <Form className={classes.form}>
            <div className={classes.inputs}>
              <FormikInputField
                label="Логин"
                name="login"
                className={classes.input}
              />
              <FormikInputField
                label="Имя"
                name="name"
                className={classes.input}
              />
              <FormikInputField
                label="Email"
                name="email"
                className={classes.input}
              />
              <FormikInputField
                label="Пароль"
                type="password"
                name="password"
                className={classes.input}
              />
              <FormikInputField
                label="Пароль ещё раз"
                type="password"
                name="confirmPassword"
                className={classes.input}
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
                disabled={isSubmitting}
                type="submit"
                variant="contained"
                color="primary"
              >
                Зарегестривароваться
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export { RegisterForm };
