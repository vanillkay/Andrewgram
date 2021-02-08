import * as userActionTypes from './types';

export const authUser = (userInfo) => ({
    type: userActionTypes.AUTH_USER,
    payload: {...userInfo}
})