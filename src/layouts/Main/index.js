import React from "react";
import LogOutButton from "../../fragments/LogOut";

import { withAuthorization } from '../../components/Session';

const MainPage = () => (
    <div>
        <LogOutButton/>
        <h1>Strona Główna</h1>
    </div>
)

const condition = authUser => !!authUser;

export default  withAuthorization(condition)(MainPage);

