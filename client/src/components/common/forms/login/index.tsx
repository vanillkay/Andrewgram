import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { Form, Formik, FormikHelpers } from 'formik';

import { Nullable } from 'types/utils';
import { loginUserAction } from 'store/user/actions';

import {
  isSubmitDisabled,
  renderFormFields,
  setFormikSubmitting,
} from '../helpers';
import {
  loginFormFields,
  loginInitialValues,
  loginValidationSchema,
} from './config';
import { useStyles } from './styles';
import { LoginFormValues } from './types';
import { ServerError } from '../server-error';

const LoginForm: FC<{ closeAndRedirect: (redirectPath: string) => void }> = ({
  closeAndRedirect,
}) => {
  const [serverError, setServerError] = useState<Nullable<string>>(null);
  const classes = useStyles();
  const dispatch = useDispatch();

  const onSuccess = () => {
    closeAndRedirect('/app');
  };

  const onError = (e: any) => {
    setServerError(e);
  };

  const handleForm = (
    values: LoginFormValues,
    helpers: FormikHelpers<LoginFormValues>
  ) => {
    if (serverError) {
      setServerError(null);
    }
    setFormikSubmitting(helpers);
    dispatch(
      loginUserAction({
        ...values,
        onSuccess,
        onError,
        onFinal: () => setFormikSubmitting(helpers, false),
      })
    );
  };

  const forgotPasswordHandle = () => {
    closeAndRedirect('/auth/reset');
  };

  return (
    <div>
      <div className={classes['form-title']}>Введите данные</div>
      <Formik<LoginFormValues>
        onSubmit={handleForm}
        initialValues={loginInitialValues}
        validationSchema={loginValidationSchema}
      >
        {(formikProps) => (
          <Form className={classes.form}>
            <div className={classes.inputs}>
              {renderFormFields(loginFormFields, classes.input)}
            </div>
            <ServerError serverError={serverError} />
            <div className={classes['form-actions']}>
              <Button
                disabled={isSubmitDisabled(loginInitialValues, formikProps)}
                type={'submit'}
                variant="contained"
                color="primary"
              >
                Войти
              </Button>
              <Button
                onClick={forgotPasswordHandle}
                variant="contained"
                style={{ marginTop: '20px' }}
                disabled={formikProps.isSubmitting}
                color="primary"
              >
                Забыли пароль
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export { LoginForm };
