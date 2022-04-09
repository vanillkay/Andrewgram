import { RegisterFormValues } from 'components/common/forms/register/types';
import { ChangePasswordFormValues } from '../../components/common/forms/change-password/types';

export type RegisterUserValues = Omit<RegisterFormValues, 'confirmPassword'>;

export type ChangePasswordValues = ChangePasswordFormValues & { token: string };
