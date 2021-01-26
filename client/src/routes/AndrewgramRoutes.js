import React from 'react';
import EntryPage from "../pages/EntryPage";
import AuthPage from "../pages/AuthPage";
import {Switch, Route, Redirect} from 'react-router-dom'
import Andrewgram from "../pages/Andrewgram";



const AndrewgramRoutes = () => {
    return (
        <Switch>
            <Route exact path='/' component={EntryPage}/>
            <Route  path='/auth' component={AuthPage}/>
            <Route exact path='/app' component={Andrewgram}/>
            {/*<Route path='*' component={Page404}/>*/}
        </Switch>
    );
};

export default AndrewgramRoutes;