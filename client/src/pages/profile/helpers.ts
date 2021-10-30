export const getVisitedUser = (
  recommended: Array<any>,
  subscription: Array<any>,
  userLogin: string
) =>
  [...recommended, ...subscription].filter(
    (item) => item.login === userLogin
  )[0];

export const isOwnUserPage = (
  visitedLogin: string,
  ownUserLogin: string
): boolean => visitedLogin === ownUserLogin;
