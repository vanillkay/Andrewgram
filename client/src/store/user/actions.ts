import { createAction } from '@reduxjs/toolkit';

import { LoginFormValues } from 'components/common/forms/login/types';
import { ChangePasswordValues, RegisterUserValues } from 'api/user/types';

import * as userActionTypes from './actionTypes';

export const resetUserPasswordAction = createAction<string>(
  userActionTypes.RESET_USER_PASSWORD
);

export const loginUserAction = createAction<LoginFormValues>(
  userActionTypes.LOGIN_USER
);

export const logoutUserAction = createAction(userActionTypes.LOGOUT_USER);

export const registerUserAction = createAction<RegisterUserValues>(
  userActionTypes.REGISTER_USER
);

export const changeUserPasswordAction = createAction<ChangePasswordValues>(
  userActionTypes.CHANGE_USER_PASSWORD
);
