export const isAuth = ({user}) => user.isAuth;
export const getUserInfo = ({user}) => user.userInfo || {login: 'andrew'};
export const getUserPosts = ({user}) => user.userInfo.posts || [];
export const getUserSubscriptions = ({user}) => user.userInfo.subscriptions || [];
export const getUserSubscribers = ({user}) => user.userInfo.subscribers || [];