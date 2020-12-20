import React from "react";
import { compose } from 'recompose';

import { withFirebase } from "../../functions/Firebase";
import  { withAuthorization } from '../../functions/Session';
import * as ROLES from '../../constants/roles';

import ArchiveView from "../../components/ArchiveView"; 



const Admin = (props) => {

    return (
        <div>
            <ArchiveView/>
        </div>
    )
}



const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN]


export default compose(
    withAuthorization(condition),
    withFirebase,
)(Admin);  