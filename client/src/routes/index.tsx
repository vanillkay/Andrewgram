import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RouteProps } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router-dom';

import { MainPage } from 'pages/main';
import ProfilePage from 'pages/profile';
import { EntryPage } from 'pages/entry';
import { isAuth } from 'store/user/selectors';
import { AuthPage } from 'pages/auth';
import { ResetPasswordPage } from 'pages/password/reset';
import { ForgotPasswordPage } from 'pages/password/forgot';

const ProtectedRoute: FC<RouteProps> = (props) => {
  const { exact, path, component } = props;

  const isAuthUser = useSelector(isAuth);

  return isAuthUser ? (
    <Route exact={exact} path={path} component={component} />
  ) : (
    <Redirect to={'/auth'} />
  );
};
const AndrewgramRoutes = () => (
  <Switch>
    <Route exact path="/" component={EntryPage} />
    <Route exact path="/auth" component={AuthPage} />
    <Route exact path="/auth/reset" component={ForgotPasswordPage} />
    <Route exact path="/auth/reset/:token" component={ResetPasswordPage} />
    <ProtectedRoute exact path="/app" component={MainPage} />
    <ProtectedRoute exact path="/profile/:login" component={ProfilePage} />
    {/*<Route path='*' component={Page404}/>*/}
  </Switch>
);

export default AndrewgramRoutes;
