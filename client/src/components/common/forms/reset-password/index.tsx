import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Form, Formik, FormikHelpers } from 'formik';
import { Dispatch, FC, SetStateAction, useState } from 'react';

import { Nullable } from 'types/utils';
import { resetUserPasswordAction } from 'store/user/actions';
import { FormikInputField } from 'components/common/input-field';

import {
  resetPasswordInitialValues,
  resetPasswordValidationSchema,
} from './config';
import { useStyles } from './styles';
import { setFormikSubmitting } from '../helpers';
import { ForgotPasswordFormValues } from './types';
import { ServerError } from '../server-error';

const ResetPasswordForm: FC<{
  setIsAppear: Dispatch<SetStateAction<boolean>>;
}> = ({ setIsAppear }) => {
  const [isSuccess, setIsSuccess] = useState<Nullable<boolean>>(null);
  const [serverError, setServerError] = useState<Nullable<string>>(null);

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleForm = (
    values: ForgotPasswordFormValues,
    helpers: FormikHelpers<ForgotPasswordFormValues>
  ) => {
    setFormikSubmitting(helpers);
    if (serverError) {
      setServerError(null);
    }
    dispatch(
      resetUserPasswordAction({
        email: values.email,
        onError: (e) => setServerError(e),
        onFinal: () => setFormikSubmitting(helpers, false),
        onSuccess: () => setIsSuccess(true),
      })
    );
  };

  const goAuth = () => {
    setIsAppear(false);
    setTimeout(() => {
      history.push('/auth');
    }, 500);
  };

  return (
    <Formik<ForgotPasswordFormValues>
      onSubmit={handleForm}
      initialValues={resetPasswordInitialValues}
      validationSchema={resetPasswordValidationSchema}
    >
      {({ isSubmitting, isValid, values }) => (
        <Form className={classes['forgot-form']}>
          <div className={classes['forgot-form__title']}>Введите ваш email</div>
          <FormikInputField name="email" type="email" label="Email" />
          <div className={classes['forgot-form__resp']}>
            <ServerError serverError={serverError} />
            {isSuccess && (
              <div className={classes['forgot-form__resp-success']}>
                На вашу почту {values.email} отправлено письмо с инструкцией.
                Если письма нету – проверьте спам
              </div>
            )}
          </div>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={isSubmitting || !isValid}
            className={classes['forgot-form__action']}
          >
            Отправить письмо
          </Button>
          <Button
            color="primary"
            onClick={goAuth}
            variant="contained"
            disabled={isSubmitting}
            className={classes['forgot-form__action']}
          >
            Авторизоваться
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export { ResetPasswordForm };
