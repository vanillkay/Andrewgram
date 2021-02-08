import * as subscribesActionTypes from './types'

export const toggleSubs = (info) => ({
    type: subscribesActionTypes.TOGGLE_SUBS,
    payload: info
});

export const setSubscriptions = (subscriptions) => ({
    type: subscribesActionTypes.SET_SUBSCRIPTIONS,
    payload: subscriptions || []
})