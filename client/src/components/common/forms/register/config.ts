import * as yup from 'yup';

export const registerValidationSchema = yup.object().shape({
  login: yup
    .string()
    .min(5, 'Минимальная длина 5 символов')
    .required('Введите значение')
    .default(''),
  name: yup.string().required('Введите значение').default(''),
  email: yup
    .string()
    .email('Введите правильный email')
    .default('')
    .required('Введите значение'),
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

export const registerInitialValues = registerValidationSchema.cast({});
