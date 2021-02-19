export const isAuth = ({user}) => user.isAuth;
export const getUserInfo = ({user}) => user.userInfo || {login: 'andrew'};
export const getIsLoadingInfo = ({user}) => user.isLoadingInfo
export const getUserSubscriptions = ({user}) => user.userInfo.subscriptions || [];
export const getUserSubscribers = ({user}) => user.userInfo.subscribers || [];
export const getVisitedUserInfo = ({user}) => user.visitedUserInfo;