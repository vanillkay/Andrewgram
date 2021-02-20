import * as userActionTypes from './types';


const initialState = {
    isAuth: false,
    isLoadingInfo: true,
    userInfo: {},
    visitedUserInfo: {
        subscriptions: [],
        subscribers: []
    }
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
        case userActionTypes.SET_VISITED_USER_INFO: {
            return {...state, visitedUserInfo: {...state.visitedUserInfo, ...action.payload}}
        }
        case userActionTypes.TOGGLE_USER_SUBS: {

            const {login, avatar} = action.payload;

            const neededSubs = state.userInfo.subscriptions.findIndex(item => item.login === login);


            if (neededSubs === -1) {
                return {
                    ...state,
                    userInfo: {...state.userInfo, subscriptions: [...state.userInfo.subscriptions, {login, avatar}]},
                    visitedUserInfo: {
                        ...state.visitedUserInfo,
                        subscribers: [...state.visitedUserInfo.subscribers, {login: state.userInfo.login, avatar: state.userInfo.avatar}]
                    }
                }
            } else {
                state.userInfo.subscriptions.splice(neededSubs, 1)

                const posInUserSubs = state.visitedUserInfo.subscribers.findIndex(item => item.login === login);

                state.visitedUserInfo.subscribers.splice(posInUserSubs, 1)
                return {
                    ...state,
                    userInfo: {...state.userInfo, subscriptions: [...state.userInfo.subscriptions]},
                    visitedUserInfo: {
                        ...state.visitedUserInfo,
                        subscribers: [...state.visitedUserInfo.subscribers]
                    }
                }
            }
        }
        default:return state;
    }
}

export default reducer;