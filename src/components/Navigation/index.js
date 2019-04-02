import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import * as routers from './../../constants/routes';
import Home from './../Home/Home';
import createPage from './../Pages/page/createPage';
import editPage from './../Pages/page/editPage';
import Login from './../Login';
import { AuthUserContext } from './../Auth';
import { auth } from 'firebase';
import Logout from './../Logout';

const AuthorizedUser = () => (

    <AuthUserContext.Consumer>
        {authUser => (
            authUser ?
                <React.Fragment>
                    <ul className="menu">
                        <li><NavLink to={routers.LANDING}>Home</NavLink></li>
                        <li><NavLink to={routers.CREATE_PAGE}>createPage</NavLink></li>
                        <li><NavLink to={`${routers.EDIT_PAGE}/:id`}>editPage</NavLink></li>
                        <li><Logout/></li>
                    </ul>
                </React.Fragment>

                :
                <React.Fragment>
                    <ul className="menu">
                        <li><NavLink to={routers.LOG_IN}>Login</NavLink></li>
                    </ul>
                </React.Fragment>
        )}
    </AuthUserContext.Consumer>
)




const Navigation = () => (
    <React.Fragment>
        <AuthorizedUser />
        <Switch>
            <Route exact path={routers.LANDING} component={Home} />
            <Route exact path={routers.LOG_IN} component={Login} />
            <Route exact path={routers.CREATE_PAGE} component={createPage} />
            <Route exact path={`${routers.EDIT_PAGE}/:id`} component={editPage} />
        </Switch>
    </React.Fragment>
);

export default Navigation;