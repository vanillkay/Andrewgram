import * as subscribesActionTypes from './types';

const initialState = {
  subscription: [],
  recommended: [],
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case subscribesActionTypes.TOGGLE_SUBS: {
      const { login, type } = action.payload;

      const arrToAddSubs =
        type === 'subscription' ? 'recommended' : 'subscription';
      const subscribedProfile = state[type].find(
        (item) => item.login === login
      );
      const newArrWithoutSubs = state[type].filter(
        (item) => item.login !== login
      );
      const newArrWithSubs = [subscribedProfile, ...state[arrToAddSubs]];

      return {
        ...state,
        [arrToAddSubs]: newArrWithSubs,
        [type]: newArrWithoutSubs,
      };
    }
    case subscribesActionTypes.SET_SUBSCRIPTIONS: {
      return { ...state, subscription: action.payload };
    }
    case subscribesActionTypes.SET_RECOMMENDED_PROFILES: {
      return { ...state, recommended: action.payload };
    }
    case subscribesActionTypes.TOGGLE_LOADING: {
      return { ...state, isLoading: !state.isLoading };
    }
    default:
      return state;
  }
};

export default reducer;
