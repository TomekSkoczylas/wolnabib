import React from "react";

import { withFirebase } from "../../functions/Firebase";
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import * as ROUTES from '../../constants/routes';
import './style.scss';
import { RiLogoutBoxRLine } from "react-icons/ri"; 

const LogOutButtonBase = (props) => {

    const handleLogOut = () => {
        props.firebase.doSignOut()
            .then(()=> {
                props.history.push(ROUTES.LOGIN)
            })
    }

    return (
        <button type="button" onClick={handleLogOut} className="logout--btn">
            <RiLogoutBoxRLine className="logout--icon out"/>
        </button>
    );
}

const LogOutButton = compose(
    withFirebase,
    withRouter,
)(LogOutButtonBase);

export default LogOutButton;