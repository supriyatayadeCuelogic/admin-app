import React from 'react';
import { NavLink } from 'react-router-dom';
import routers from './../../constants/routes';


const Navigation = () => (
    <div>
        <ul>
            <NavLink path={routers.LANDING}>Home</NavLink>
            <NavLink path={routers.LOG_IN}>Login</NavLink>
        </ul>
    </div>
)

export default Navigation;