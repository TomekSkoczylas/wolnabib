import React from "react";


import { withAuthorization } from '../../components/Session';
import LogOutButton from "../../fragments/LogOut";
import SearchEngine from "../../fragments/SearchEngine";

const MainPage = props => {
    return (
    <div>
        <LogOutButton/>
        <h1>Strona Główna</h1>
        <SearchEngine/>
    </div>
    )
};



const condition = authUser => !!authUser;



export default withAuthorization(condition)(MainPage);

