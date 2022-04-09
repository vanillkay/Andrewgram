import * as yup from 'yup';

import { FormikInputFiledProps } from 'components/common/input-field/types';

export const changePasswordFormFields: FormikInputFiledProps[] = [
  {
    label: 'Пароль',
    name: 'password',
    type: 'password',
  },
  {
    type: 'password',
    name: 'confirmPassword',
    label: 'Пароль ещё раз',
  },
];

export const resetPasswordValidationSchema = yup.object().shape({
  password: yup
    .string()
    .min(7, 'Минимальная длина 7 символов')
    .required('Введите значение')
    .default(''),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Пароли не совпадают')
    .required('Введите значение')
    .default(''),
});

export const resetPasswordInitialValues = resetPasswordValidationSchema.cast(
  {}
);
