import * as yup from 'yup';

import { FormikInputFiledProps } from 'components/common/input-field/types';

export const registerFormFields: FormikInputFiledProps[] = [
  {
    label: 'Логин',
    name: 'login',
  },
  {
    label: 'Имя',
    name: 'name',
  },
  {
    label: 'Email',
    name: 'email',
    type: 'Email',
  },
  {
    label: 'Пароль',
    type: 'password',
    name: 'password',
  },
  {
    label: 'Пароль ещё раз',
    type: 'password',
    name: 'confirmPassword',
  },
];

export const registerValidationSchema = yup.object().shape({
  login: yup
    .string()
    .required('Введите значение')
    .min(5, 'Минимальная длина 5 символов')
    .default(''),
  name: yup.string().required('Введите значение').default(''),
  email: yup
    .string()
    .required('Введите значение')
    .email('Введите правильный email')
    .default(''),
  password: yup
    .string()
    .required('Введите значение')
    .min(7, 'Минимальная длина 7 символов')
    .default(''),
  confirmPassword: yup
    .string()
    .required('Введите значение')
    .oneOf([yup.ref('password'), null], 'Пароли не совпадают')
    .default(''),
});

export const registerInitialValues = registerValidationSchema.cast({});
