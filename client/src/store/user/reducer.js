import * as userActionTypes from './types';


const initialState = {
    isAuth: false,
    isLoadingInfo: true,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case userActionTypes.AUTH_USER: {
            return {...state, isAuth: true, ...action.payload}
        }
        case userActionTypes.LOGOUT_USER: {
            return {isAuth: false}
        }
        case userActionTypes.SET_USER_AVATAR: {
            return {...state, userInfo: {...state.userInfo, avatar: action.payload}}
        }
    }
    return state;
}

export default reducer;