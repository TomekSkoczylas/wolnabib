import React from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../../functions/Session'
import LogOutButton from '../LogOut';
import * as ROUTES from '../../constants/routes';
import './style.scss';
import { RiLoginBoxLine, RiDraftLine } from 'react-icons/ri';
import {ImBooks} from 'react-icons/im';
import { FaRegIdCard } from 'react-icons/fa';

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
        <div className="nav--container">
            <ul className="nav--link-list">
                <LogOutButton/>
                <Link to={ROUTES.MAIN} className="nav--link-main"><ImBooks className="nav--icon"/></Link>
                <Link to={ROUTES.ACCOUNT}className="nav--link-acc"><FaRegIdCard className="nav--icon"/></Link>
            </ul>
            <span className="nav--text">Witaj, {authUser.username}</span>
        </div>
    )
} 



const NavNonAuth = () => {
    return (
        <div className="nav--container">
            <ul className="nav--link-list">
                <Link to={ROUTES.LOGIN} className="nav--link-in"><RiLoginBoxLine className="nav--icon in"/></Link>
                <Link to={ROUTES.SIGNUP} className="nav--link-up"><RiDraftLine className="nav--icon up"/></Link>
            </ul>
            <span className="nav--text">Witaj, nieznajoma</span>
        </div>
    )
}


export default Navigation;