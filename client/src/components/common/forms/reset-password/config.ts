import * as yup from 'yup';

export const resetPasswordValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Введите корректный email')
    .required('Введите значение')
    .default(''),
});

export const resetPasswordInitialValues = resetPasswordValidationSchema.cast(
  {}
);
