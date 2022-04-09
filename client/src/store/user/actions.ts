import { createAction } from '@reduxjs/toolkit';

import { LoginFormValues } from 'components/common/forms/login/types';
import { ChangePasswordValues, RegisterUserValues } from 'api/user/types';
import { ForgotPasswordFormValues } from 'components/common/forms/reset-password/types';

import { UserToken } from 'types/user';
import { WithSagaHelpers } from '../types';
import * as userActionTypes from './actionTypes';

export const resetUserPasswordAction = createAction<
  WithSagaHelpers<ForgotPasswordFormValues>
>(userActionTypes.RESET_USER_PASSWORD);

export const loginUserAction = createAction<WithSagaHelpers<LoginFormValues>>(
  userActionTypes.LOGIN_USER
);

export const logoutUserAction = createAction(userActionTypes.LOGOUT_USER);

export const registerUserAction = createAction<
  WithSagaHelpers<RegisterUserValues>
>(userActionTypes.REGISTER_USER);

export const changeUserPasswordAction = createAction<
  WithSagaHelpers<ChangePasswordValues>
>(userActionTypes.CHANGE_USER_PASSWORD);

export const checkChangePasswordToken = createAction<
  WithSagaHelpers<UserToken>
>(userActionTypes.CHECK_CHANGE_PASSWORD_TOKEN);
