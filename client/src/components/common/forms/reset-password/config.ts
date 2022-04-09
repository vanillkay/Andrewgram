import * as yup from 'yup';

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
