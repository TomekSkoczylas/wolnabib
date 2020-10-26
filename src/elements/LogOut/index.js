import React from "react";

import { withFirebase } from "../../components/Firebase";
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import * as ROUTES from '../../constants/routes';


const LogOutButtonBase = (props) => {

    const handleLogOut = () => {
        props.firebase.doSignOut()
            .then(()=> {
                props.history.push(ROUTES.LOGIN)
            })
    }

    return (
        <button type="button" onClick={handleLogOut}>
            Wyloguj się
        </button>
    );
}

const LogOutButton = compose(
    withFirebase,
    withRouter,
)(LogOutButtonBase);

export default LogOutButton;