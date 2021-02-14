import * as userActionTypes from './types';

export const authUser = (userInfo) => ({
    type: userActionTypes.AUTH_USER,
    payload: {...userInfo}
})

export const logoutUser = () => ({
    type: userActionTypes.LOGOUT_USER,
})

export const setUserAvatar = (avatar) => ({
    type: userActionTypes.SET_USER_AVATAR,
    payload: avatar
})