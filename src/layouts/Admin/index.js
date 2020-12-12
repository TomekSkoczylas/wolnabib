import React from "react";
import { compose } from 'recompose';

import { withFirebase } from "../../functions/Firebase";
import  { withAuthorization } from '../../functions/Session';
// import * as ROLES from '../../constants/roles';



const Admin = () => {
    return (
        <div>
            <div>Admin Site</div>
        </div>
    )
}


const condition = authUser => authUser && !!authUser.roles["ADMIN"]


export default compose(
    withAuthorization(condition),
    withFirebase,
)(Admin);  