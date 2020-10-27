import React from "react";
import LogOutButton from "../../fragments/LogOut";
import PassChangeForm from "../../fragments/PassChange";
import {AuthUserContext, withAuthorization} from '../../components/Session';


const AccountPage = () => (
    <AuthUserContext.Consumer>
        {authUser => (
            <div>
                <LogOutButton/>
                <h1>Twoje konto Konto</h1>
                <p>Imię {authUser.displayName}</p>
                <p>Email {authUser.email}</p>
                <PassChangeForm/>
            </div>
        )}
    </AuthUserContext.Consumer>

);

const condition = authUser => !!authUser;

export default   withAuthorization(condition)(AccountPage);