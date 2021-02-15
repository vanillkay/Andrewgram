import postActionTypes from './types';
import {useHttp} from "../../hooks/http.hook";


// const {request, loading} = useHttp();

export const loadSubsPosts = () => (dispatch, getState) => {
    const state = getState();
    const login = state.user.userInfo.login;
    // console.log('state',state);
}

// export const getUsersPosts = (login) => {
//     request('/posts/users', 'post', {login})
//         .then(res => console.log(res));
// }