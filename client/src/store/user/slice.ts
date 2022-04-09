import { UserState } from './types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const userInitialState: UserState = {
  isAuth: false,
  isLoadingInfo: true,
  user: null,
  visitedUserInfo: {
    subscriptions: [],
    subscribers: [],
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    authUser: (state, action) => {
      state.isAuth = true;
      debugger;
      console.log(action.payload);
    },
    logoutUser: (state) => {
      state.isAuth = false;
    },
    setUserAvatar: (state, action) => {
      debugger;
      // @ts-ignore
      state.userInfo = { ...state.userInfo, avatar: action.payload };
    },
    setVisitedUserInfo: (state, action) => {
      debugger;
      state.visitedUserInfo = { ...state.visitedUserInfo, ...action.payload };
    },
    toggleUserSubs: (
      state,
      action: PayloadAction<{ login: string; avatar: string }>
    ) => {
      const { login, avatar } = action.payload;

      // @ts-ignore
      const neededSubs = state.userInfo.subscriptions.findIndex(
        // @ts-ignore
        (item) => item.login === login
      );

      if (neededSubs === -1) {
        // @ts-ignore

        state.userInfo = {
          // @ts-ignore
          ...state.userInfo,
          // @ts-ignore
          subscriptions: [...state.userInfo.subscriptions, { login, avatar }],
        };
        state.visitedUserInfo = {
          ...state.visitedUserInfo,
          subscribers: [
            // @ts-ignore
            ...state.visitedUserInfo.subscribers,
            // @ts-ignore
            { login: state.userInfo.login, avatar: state.userInfo.avatar },
          ],
        };
      } else {
        // @ts-ignore
        state.userInfo.subscriptions.splice(neededSubs, 1);

        const posInUserSubs = state.visitedUserInfo.subscribers.findIndex(
          (item) => item.login === login
        );

        state.visitedUserInfo.subscribers.splice(posInUserSubs, 1);

        // @ts-ignore
        state.userInfo = {
          // @ts-ignore
          ...state.userInfo,
          // @ts-ignore
          subscriptions: [...state.userInfo.subscriptions],
        };
        state.visitedUserInfo = {
          ...state.visitedUserInfo,
          subscribers: [...state.visitedUserInfo.subscribers],
        };
      }
    },
  },
});

const {
  reducer: userReducer,
  actions: {
    authUser,
    logoutUser,
    setUserAvatar,
    toggleUserSubs,
    setVisitedUserInfo,
  },
} = userSlice;

export {
  authUser,
  logoutUser,
  userReducer,
  setUserAvatar,
  toggleUserSubs,
  setVisitedUserInfo,
};
