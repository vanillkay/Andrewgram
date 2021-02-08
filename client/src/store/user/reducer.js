import * as userActionTypes from './types';


const initialState = {
    isAuth: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case userActionTypes.AUTH_USER: {
            return {...state, isAuth: true, ...action.payload}
        }
    }
    return state;
}

export default reducer;