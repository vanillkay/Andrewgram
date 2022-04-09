import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Form, Formik, FormikHelpers } from 'formik';

import { Nullable } from 'types/utils';
import { changeUserPasswordAction } from 'store/user/actions';

import {
  changePasswordFormFields,
  resetPasswordInitialValues,
  resetPasswordValidationSchema,
} from './config';
import { useStyles } from './styles';
import { ServerError } from '../server-error';
import { ChangePasswordFormValues } from './types';
import { renderFormFields, setFormikSubmitting } from '../helpers';

const ChangePasswordForm: FC<{ token: string }> = ({ token }) => {
  const [serverError, setServerError] = useState<Nullable<string>>(null);
  const [isSuccess, setIsSuccess] = useState<Nullable<boolean>>(null);

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = (
    values: ChangePasswordFormValues,
    helpers: FormikHelpers<ChangePasswordFormValues>
  ) => {
    setFormikSubmitting(helpers);
    if (serverError) {
      setServerError(null);
    }
    if (isSuccess) {
      setIsSuccess(false);
    }
    dispatch(
      changeUserPasswordAction({
        password: values.password,
        token,
        onError: setServerError,
        onSuccess: () => setIsSuccess(true),
        onFinal: () => setFormikSubmitting(helpers, false),
      })
    );
  };

  return (
    <Formik<ChangePasswordFormValues>
      onSubmit={handleSubmit}
      initialValues={resetPasswordInitialValues}
      validationSchema={resetPasswordValidationSchema}
    >
      {({ isSubmitting, isValid }) => (
        <Form className={classes['reset-form']}>
          <div className={classes['reset-form__title']}>
            Введите новый пароль
          </div>
          {renderFormFields(
            changePasswordFormFields,
            classes['reset-form__input']
          )}
          <div className={classes['reset-form__resp']}>
            <ServerError serverError={serverError} />
            {isSuccess && (
              <div className={classes['reset-form__resp-success']}>
                Вы успешно изменили пароль
              </div>
            )}
          </div>
          <Button
            color="primary"
            type={'submit'}
            variant="contained"
            disabled={isSubmitting || !isValid}
            className={classes['reset-form__action']}
          >
            Измeнить пароль
          </Button>
          {isSuccess && (
            <Button
              color="primary"
              variant="contained"
              disabled={isSubmitting}
              onClick={() => history.push('/auth')}
              className={classes['reset-form__action']}
            >
              Авторизоваться
            </Button>
          )}
        </Form>
      )}
    </Formik>
  );
};

export { ChangePasswordForm };
