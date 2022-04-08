import * as yup from 'yup';

export const forgotPasswordValidationSchema = yup.object().shape({
  email: yup.string().email('Введите корректный email').required().default(''),
});

export const forgetPasswordInitialValues = forgotPasswordValidationSchema.cast(
  {}
);
