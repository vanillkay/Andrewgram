import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Form, Formik, FormikHelpers } from 'formik';
import { Dispatch, FC, SetStateAction } from 'react';

import { loginUserAction } from 'store/user/actions';
import FormikInputField from 'components/common/input-field';

import { useStyles } from './styles';
import { LoginFormValues } from './types';
import { loginInitialValues, loginValidationSchema } from './config';

const LoginForm: FC<{ setIsAppear: Dispatch<SetStateAction<boolean>> }> = ({
  setIsAppear,
}) => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleForm = (
    values: LoginFormValues,
    helpers: FormikHelpers<LoginFormValues>
  ) => {
    helpers.setSubmitting(true);
    dispatch(loginUserAction(values));
    // setIsAppear(false);
    // setTimeout(() => {
    //   history.push('/app');
    // }, 700);
  };

  const forgotPasswordHandle = () => {
    setIsAppear(false);
    setTimeout(() => {
      history.push('/auth/reset');
    }, 700);
  };

  return (
    <div>
      <div className={classes['form-title']}>Введите данные</div>
      <Formik<LoginFormValues>
        initialValues={loginInitialValues}
        validationSchema={loginValidationSchema}
        onSubmit={handleForm}
      >
        {({ isSubmitting }) => (
          <Form className={classes.form}>
            <div className={classes.inputs}>
              <FormikInputField name="login" className={classes.input} />
              <FormikInputField name="password" className={classes.input} />
            </div>
            {/*{isServerError && (*/}
            {/*  <p className={classes['login-error']}>{serverErrorText}</p>*/}
            {/*)}*/}
            <div className={classes['form-actions']}>
              <Button
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
