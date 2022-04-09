import { SubscribersState } from './types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/user';

const subscribersInitialState: SubscribersState = {
  subscription: [],
  recommended: [],
  isLoading: false,
};

const subscribersSlice = createSlice({
  name: 'subscribers',
  initialState: subscribersInitialState,
  reducers: {
    toggleLoading: (state) => {
      state.isLoading = !state.isLoading;
    },
    setRecommended: (state, action: PayloadAction<User[]>) => {
      state.recommended = action.payload;
    },
    setSubscriptions: (state, action: PayloadAction<User[]>) => {
      state.subscription = action.payload;
    },
    toggleSubs: (
      state,
      action: PayloadAction<{
        login: string;
        type: 'subscription' | 'recommended';
      }>
    ) => {
      const { login, type } = action.payload;

      const arrToAddSubs =
        type === 'subscription' ? 'recommended' : 'subscription';
      const subscribedProfile = state[type].find(
        (item) => item.login === login
      );
      const newArrWithoutSubs = state[type].filter(
        (item) => item.login !== login
      );
      // @ts-ignore
      state[arrToAddSubs] = [subscribedProfile, ...state[arrToAddSubs]];
      state[type] = newArrWithoutSubs;
    },
  },
});

const {
  reducer: subscribersReducer,
  actions: { setRecommended, setSubscriptions, toggleSubs, toggleLoading },
} = subscribersSlice;

export {
  toggleSubs,
  toggleLoading,
  setRecommended,
  setSubscriptions,
  subscribersReducer,
};
