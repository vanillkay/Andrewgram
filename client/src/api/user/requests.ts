import { client } from '../index';
import { User } from '../../types/user';
import { LoginFormValues } from '../../components/common/forms/login/types';

export const forgotPassword = (email: string): Promise<void> =>
  client.post('/auth/reset', { email }).then(({ data }) => data);

export const loginUser = (values: LoginFormValues): Promise<User> =>
  client.post('/auth/login', { values }).then(({ data }) => data);
