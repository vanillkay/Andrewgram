import * as userActionTypes from './actionTypes';
import { createAction } from '@reduxjs/toolkit';
import { LoginFormValues } from '../../components/common/forms/login/types';

export const resetPasswordAction = createAction<string>(
  userActionTypes.RESET_USER_PASSWORD
);

export const loginUserAction = createAction<LoginFormValues>(
  userActionTypes.LOGIN_USER
);

export const authUser = (userInfo) => ({
  type: userActionTypes.AUTH_USER,
  payload: { ...userInfo },
});

export const logoutUser = () => ({
  type: userActionTypes.LOGOUT_USER,
});

export const setUserAvatar = (avatar) => ({
  type: userActionTypes.SET_USER_AVATAR,
  payload: avatar,
});

export const setVisitedUserInfo = (info) => ({
  type: userActionTypes.SET_VISITED_USER_INFO,
  payload: info,
});

export const toggleUserSubs = (subs) => ({
  type: userActionTypes.TOGGLE_USER_SUBS,
  payload: subs,
});
