import { RegisterFormValues } from 'components/common/forms/register/types';
import { ChangePasswordFormValues } from '../../components/common/forms/reset-password/types';

export type RegisterUserValues = Omit<RegisterFormValues, 'confirmPassword'>;

export type ChangePasswordValues = ChangePasswordFormValues & { token: string };
