import { client } from 'api';
import { User } from 'types/user';
import { LoginFormValues } from 'components/common/forms/login/types';

import { ChangePasswordValues, RegisterUserValues } from './types';

export const forgotPassword = (email: string): Promise<void> =>
  client.post('/auth/reset', { email }).then(({ data }) => data);

export const loginUser = (values: LoginFormValues): Promise<User> =>
  client.post('/auth/login', { values }).then(({ data }) => data);

export const logoutUser = (): Promise<void> =>
  client.get('/auth/logout').then(({ data }) => data);

export const registerUser = (values: RegisterUserValues): Promise<void> =>
  client.post('/auth/register', values).then(({ data }) => data);

export const changeUserPassword = (
  values: ChangePasswordValues
): Promise<void> =>
  client.post('/auth/reset/password', values).then(({ data }) => data);
