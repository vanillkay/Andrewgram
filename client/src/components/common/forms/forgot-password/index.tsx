import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Form, Formik, FormikHelpers } from 'formik';
import { Dispatch, FC, SetStateAction } from 'react';

import {
  forgetPasswordInitialValues,
  forgotPasswordValidationSchema,
} from './config';
import { useStyles } from './styles';
import FormikInputField from '../../input-field';
import { ForgotPasswordFormValues } from './types';
import { resetPasswordAction } from '../../../../store/user/actions';

const ForgotPasswordForm: FC<{
  setIsAppear: Dispatch<SetStateAction<boolean>>;
}> = ({ setIsAppear }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleForm = async (
    values: ForgotPasswordFormValues,
    helpers: FormikHelpers<ForgotPasswordFormValues>
  ) => {
    helpers.setSubmitting(true);
    dispatch(resetPasswordAction(values.email));
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
      initialValues={forgetPasswordInitialValues}
      validationSchema={forgotPasswordValidationSchema}
    >
      {({ isSubmitting }) => (
        <Form className={classes['forgot-form']}>
          <div className={classes['forgot-form__title']}>Введите ваш email</div>
          <FormikInputField name="email" />
          <div className={classes['forgot-form__resp']}>
            {/*{response.ready &&*/}
            {/*  (response.success ? (*/}
            {/*    <div className={classes['forgot-form__resp-success']}>*/}
            {/*      На вашу почту отправлено письмо с инструкцией. Если письма*/}
            {/*      нету – проверьте спам*/}
            {/*    </div>*/}
            {/*  ) : (*/}
            {/*    <div className={classes['forgot-form__resp-error']}>*/}
            {/*      {response.errorText}*/}
            {/*    </div>*/}
            {/*  ))}*/}
          </div>
          <Button
            className={classes['forgot-form__action']}
            disabled={isSubmitting}
            type="submit"
            variant="contained"
            color="primary"
          >
            Отправить письмо
          </Button>
          <Button
            onClick={goAuth}
            className={classes['forgot-form__action']}
            disabled={isSubmitting}
            variant="contained"
            color="primary"
          >
            Авторизоваться
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export { ForgotPasswordForm };
