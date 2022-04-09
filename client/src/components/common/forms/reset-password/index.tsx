import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Form, Formik, FormikHelpers } from 'formik';

import FormikInputField from 'components/common/input-field';
import { changeUserPasswordAction } from 'store/user/actions';

import {
  resetPasswordInitialValues,
  resetPasswordValidationSchema,
} from './config';
import { useStyles } from './styles';
import { ChangePasswordFormValues } from './types';

const ResetPassword: FC<{ token: string }> = ({ token }) => {
  const [serverError, setServerError] = useState({
    isError: false,
    errorText: '',
  });
  const [isReady, setIsReady] = useState(false);

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const resetPassword = (
    values: ChangePasswordFormValues,
    helpers: FormikHelpers<ChangePasswordFormValues>
  ) => {
    helpers.setSubmitting(true);
    dispatch(changeUserPasswordAction({ password: values.password, token }));
  };

  return (
    <Formik<ChangePasswordFormValues>
      validationSchema={resetPasswordValidationSchema}
      initialValues={resetPasswordInitialValues}
      onSubmit={resetPassword}
    >
      {({ isSubmitting }) => (
        <Form className={classes['reset-form']}>
          <div className={classes['reset-form__title']}>
            Введите новый пароль
          </div>
          <FormikInputField
            label="Пароль"
            name="password"
            type="password"
            className={classes['reset-form__input']}
          />
          <FormikInputField
            label="Пароль ещё раз"
            name="confirmPassword"
            type="password"
            className={classes['reset-form__input']}
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
            className={classes['reset-form__action']}
            disabled={isSubmitting}
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
              disabled={isSubmitting}
              type={'submit'}
              variant="contained"
              color="primary"
            >
              Авторизоваться
            </Button>
          )}
        </Form>
      )}
    </Formik>
  );
};

export { ResetPassword };
