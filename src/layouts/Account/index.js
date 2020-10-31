import React from "react";
import LogOutButton from "../../fragments/LogOut";
import PassChangeForm from "../../fragments/PassChange";
import {AuthUserContext, withAuthorization} from '../../components/Session';
import NameAddForm from "../../fragments/NameChange";


const AccountPage = () => (
    <AuthUserContext.Consumer>
        {authUser => (
            <div>
                <LogOutButton/>
                <h1>Twoje Konto</h1>
                <p>Imię {authUser.displayName}</p>
                <p>Drugie imie: {authUser.username}</p>
                <p>Email {authUser.email}</p>
                <PassChangeForm/>
                <NameAddForm/>
            </div>
        )}
    </AuthUserContext.Consumer>

);

const condition = authUser => !!authUser;

export default   withAuthorization(condition)(AccountPage);