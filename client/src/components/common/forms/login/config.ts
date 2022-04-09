import * as yup from 'yup';

import { FormikInputFiledProps } from 'components/common/input-field/types';

export const loginFormFields: FormikInputFiledProps[] = [
  {
    label: 'Логин',
    name: 'login',
  },
  {
    label: 'Пароль',
    type: 'password',
    name: 'password',
  },
];

export const loginValidationSchema = yup.object().shape({
  login: yup.string().required('Введите значение').default(''),
  password: yup.string().required('Введите значение').default(''),
});

export const loginInitialValues = loginValidationSchema.cast({});
