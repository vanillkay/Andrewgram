import React from 'react';
import EntryPage from "../pages/EntryPage";
import AuthPage from "../pages/AuthPage";
import {Switch, Route, Redirect} from 'react-router-dom'
import Andrewgram from "../pages/Andrewgram";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import {useSelector} from "react-redux";
import {isAuth} from "../store/user/selectors";
import ProfilePage from "../pages/ProfilePage";


const ProtectedRoute = (props) => {

    const {exact, path, component} = props;

    const isAuthUser = useSelector(isAuth);

    return (
        isAuthUser ? <Route exact={exact} path={path} component={component}/> : <Redirect to={'/auth'}/>
    )
}
const AndrewgramRoutes = () => {



    return (
        <Switch>
            <Route exact path='/' component={EntryPage}/>
            <Route exact path='/auth' component={AuthPage}/>
            <Route exact path='/auth/reset' component={ForgotPasswordPage}/>
            <Route exact path='/auth/reset/:token' component={ResetPasswordPage}/>
            <ProtectedRoute exact path='/app' component={Andrewgram}/>
            <Route  exact path='/profile/:login' component={ProfilePage}/>
            {/*<Route path='*' component={Page404}/>*/}
        </Switch>
    );
};

export default AndrewgramRoutes;