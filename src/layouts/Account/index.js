import React from "react";
import LogOutButton from "../../fragments/LogOut";
import PassChangeForm from "../../fragments/PassChange";
import { withAuthorization } from '../../components/Session';


const AccountPage = () => (
    <div>
        <LogOutButton/>
        <h1>Twoje Konto</h1>
        <PassChangeForm/>
    </div>
);

const condition = authUser => !!authUser;

export default   withAuthorization(condition)(AccountPage);