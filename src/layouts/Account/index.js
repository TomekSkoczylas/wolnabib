import React from "react";
import PassChangeForm from "../../components/PassChange";
import {AuthUserContext, withAuthorization} from '../../functions/Session';
import './style.scss';


const AccountPage = () => (
    <AuthUserContext.Consumer>
        {authUser => (
            <div className="account">
                <div className="account--container">
                    <h1 className="account--title">Twoje Konto</h1>
                    <span className="account--content">Twoje imie: {authUser.username}</span>
                    <span className="account--content">Twój email: {authUser.email}</span>
                    <PassChangeForm/>
                </div>
            </div>
        )}
    </AuthUserContext.Consumer>

);

const condition = authUser => !!authUser;

export default   withAuthorization(condition)(AccountPage);