import React from 'react';
import EntryPage from "../pages/EntryPage";
import AuthPage from "../pages/AuthPage";
import {Switch, Route} from 'react-router-dom'
import Andrewgram from "../pages/Andrewgram";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";



const AndrewgramRoutes = () => {
    return (
        <Switch>
            <Route exact path='/' component={EntryPage}/>
            <Route exact path='/auth' component={AuthPage}/>
            <Route exact path='/auth/reset' component={ForgotPasswordPage}/>
            <Route exact path='/auth/reset/:token' component={ResetPasswordPage}/>
            <Route exact path='/app' component={Andrewgram}/>
            {/*<Route path='*' component={Page404}/>*/}
        </Switch>
    );
};

export default AndrewgramRoutes;