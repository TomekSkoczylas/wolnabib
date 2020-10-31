import React from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../../functions/Session'
import LogOutButton from '../LogOut';
import * as ROUTES from '../../constants/routes';

const Navigation = () => {
    return (
        <div>
            <AuthUserContext.Consumer>
                {authUser =>
                authUser ? <NavAuth authUser={authUser}/> : <NavNonAuth/>
                }
            </AuthUserContext.Consumer>
        </div>
    );
};


const NavAuth = ({authUser}) => {
    return (
        <div>
            <ul>
                <LogOutButton/>
                <Link to={ROUTES.MAIN}>Storna główna</Link>
                <Link to={ROUTES.ACCOUNT}>Twoje Konto</Link>
            </ul>
            <span>{authUser.username}</span>
        </div>
    )
} 

const NavNonAuth = () => {
    return (
        <div>
            <ul>
                <Link to={ROUTES.LOGIN}>Log In</Link>
                <Link to={ROUTES.SIGNUP}>Zausz konto</Link>
            </ul>
            <span>Gościni</span>
        </div>
    )
}


export default Navigation;