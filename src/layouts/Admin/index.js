import React from "react";
import { compose } from 'recompose';

import { withFirebase } from "../../functions/Firebase";
import  { withAuthorization } from '../../functions/Session';
import * as ROLES from '../../constants/roles';

import ArchiveView from "../../components/ArchiveView"; 
import UsersView from "../../components/UsersView";

import './style.scss';

const Admin = (props) => {

    return (
        <div className="admin">
            <span className="admin--title">Panel Administratora</span>
            <div className="admin--container">
                <ArchiveView/>
                <UsersView/>
            </div>
        </div>
    )
}



const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN]


export default compose(
    withAuthorization(condition),
    withFirebase,
)(Admin);  