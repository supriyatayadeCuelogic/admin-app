import React from 'react';
import { NavLink,Route,Switch } from 'react-router-dom';
import * as routers from './../../constants/routes';
import Home from './../Home/Home';
import createPage from './../Pages/page/createPage';
import editPage from './../Pages/page/editPage';
import Login from './../Login';

const Navigation = () => (
    <React.Fragment>        
        <ul>
            <li><NavLink to={routers.LANDING}>Home</NavLink></li>
            <li><NavLink to={routers.LOG_IN}>Login</NavLink></li>    
            <li><NavLink to={routers.CREATE_PAGE}>createPage</NavLink></li>
            <li><NavLink to={routers.EDIT_PAGE}>editPage</NavLink></li>   
        </ul>

        <Switch>
            <Route exact path={routers.LANDING} component={Home} />
            <Route exact path={routers.LOG_IN} component={Login} />
            <Route exact path={routers.CREATE_PAGE} component={createPage} />
            <Route exact path={routers.EDIT_PAGE} component={editPage} />
        </Switch>       
    </React.Fragment>
);

export default Navigation;