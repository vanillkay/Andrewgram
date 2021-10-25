import * as userActionTypes from './types';

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
