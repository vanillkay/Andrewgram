import * as yup from 'yup';

export const loginValidationSchema = yup.object().shape({
  login: yup.string().email('Введите корректный email').required().default(''),
  password: yup.string().required().default(''),
});

export const loginInitialValues = loginValidationSchema.cast({});
