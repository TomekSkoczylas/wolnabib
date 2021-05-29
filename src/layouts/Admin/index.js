import React from "react";
import { compose } from 'recompose';

import { withFirebase } from "../../functions/Firebase";
import  { withAuthorization, withEmailVerification } from '../../functions/Session';
import * as ROLES from '../../constants/roles';

import ArchiveView from "../../components/ArchiveView"; 
import UsersView from "../../components/UsersView";

import './style.scss';
// import collection from "../Admin/collection/collection.json";

const Admin = (props) => {

    // // const onSub =()=> {
    // //     const coll = collection;
    // //     console.log(coll);
    // //     coll.map(book => (
    // //         props.firebase
    // //         .books()
    // //         .push(book)
    // //         .then(console.log(book))
    // //     ));
    // }

    return (
        <div className="admin">
            {/* <button onClick={onSub}>Ad Books</button> */}
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
    withEmailVerification,
    withAuthorization(condition),
    withFirebase,
)(Admin);  