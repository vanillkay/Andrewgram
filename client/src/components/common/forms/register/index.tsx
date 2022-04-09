import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { Form, Formik, FormikHelpers } from 'formik';
import { registerUserAction } from 'store/user/actions';

import { Nullable } from 'types/utils';

import {
  isSubmitDisabled,
  renderFormFields,
  setFormikSubmitting,
} from '../helpers';
import {
  registerFormFields,
  registerInitialValues,
  registerValidationSchema,
} from './config';
import { useStyles } from './styles';
import { RegisterFormValues } from './types';
import { ServerError } from '../server-error';

const RegisterForm: FC<{ closeAndRedirect: (redirectPath: string) => void }> =
  ({ closeAndRedirect }) => {
    const [serverError, setServerError] = useState<Nullable<string>>(null);

    const classes = useStyles();
    const dispatch = useDispatch();

    const onError =
      ({ setErrors }: FormikHelpers<RegisterFormValues>) =>
      (message: string) => {
        if (message.toLowerCase().includes('логин')) {
          setErrors({ login: 'Такой логин уже занят' });
          return;
        }
        if (message.includes('email')) {
          setErrors({ email: 'Такой email уже занят' });
          return;
        }
        setServerError(message);
      };

    const onSuccess = () => {
      closeAndRedirect('/app');
    };

    const handleForm = (
      values: RegisterFormValues,
      helpers: FormikHelpers<RegisterFormValues>
    ) => {
      helpers.setErrors({});
      setFormikSubmitting(helpers);
      if (serverError) {
        setServerError(null);
      }
      const { confirmPassword, ...userValues } = values;
      dispatch(
        registerUserAction({
          ...userValues,
          onError: onError(helpers),
          onSuccess,
          onFinal: () => setFormikSubmitting(helpers, false),
        })
      );
    };

    return (
      <div>
        <div className={classes['form-title']}>Введите данные</div>
        <Formik<RegisterFormValues>
          onSubmit={handleForm}
          initialValues={registerInitialValues}
          validationSchema={registerValidationSchema}
        >
          {(formikProps) => (
            <Form className={classes.form}>
              <div className={classes.inputs}>
                {renderFormFields(registerFormFields, classes.input)}
              </div>
              <ServerError serverError={serverError} />
              <div className={classes['form-actions']}>
                <Button
                  disabled={isSubmitDisabled(
                    registerInitialValues,
                    formikProps
                  )}
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
