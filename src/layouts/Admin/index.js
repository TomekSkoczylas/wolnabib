import React from "react";
import { compose } from 'recompose';

import { withFirebase } from "../../functions/Firebase";
import  { withAuthorization } from '../../functions/Session';
import * as ROLES from '../../constants/roles';

import ArchiveView from "../../components/ArchiveView"; 
import UsersView from "../../components/UsersView";


const Admin = (props) => {

    return (
        <div>
            <ArchiveView/>
            <UsersView/>
        </div>
    )
}



const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN]


export default compose(
    withAuthorization(condition),
    withFirebase,
)(Admin);  