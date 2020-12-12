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
        <div className="nav__container">
            <ul className="nav__link-list">
                <LogOutButton/>
                <Link to={ROUTES.MAIN} className="nav__link-main"><ImBooks className="nav__icon"/></Link>
                <Link to={ROUTES.ACCOUNT}className="nav__link-acc"><FaRegIdCard className="nav__icon"/></Link>
            </ul>
            <span className="nav__text">Witaj, {authUser.username}</span>
        </div>
    )
} 



const NavNonAuth = () => {
    return (
        <div className="nav__container">
            <ul className="nav__link-list">
                {/* <Link to={ROUTES.LOGIN} className="nav__link-in"><RiLoginBoxLine className="nav__icon in"/></Link> */}
                <a href='/#login' className="nav__link-in"><RiLoginBoxLine className="nav__icon in"/></a>
                <Link to={ROUTES.SIGNUP} className="nav__link-up"><RiDraftLine className="nav__icon up"/></Link>
            </ul>
            <span className="nav__text">Witaj, nieznajoma</span>
        </div>
    )
}


export default Navigation;